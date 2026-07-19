import type { Blueprint, ResearchSession } from "../domain/types";

export type SessionDiagnosticSeverity = "info" | "warning" | "error";

export type SessionDiagnosticCode =
  | "SESSION_BLUEPRINT_WHITESPACE"
  | "ANSWER_QUESTION_UNKNOWN"
  | "ANSWER_QUESTION_DUPLICATE"
  | "CURRENT_INDEX_BELOW_RANGE"
  | "CURRENT_INDEX_ABOVE_RANGE"
  | "DECISION_ALTERNATIVE_UNKNOWN"
  | "COMPLETED_WITHOUT_DECISION";

export interface SessionDiagnostic {
  code: SessionDiagnosticCode;
  severity: SessionDiagnosticSeverity;
  message: string;
  field?: string;
  entityId?: string;
  recoverable: boolean;
}

export interface SessionDiagnosticsReport {
  diagnostics: SessionDiagnostic[];
  hasErrors: boolean;
  hasWarnings: boolean;
}

/**
 * Pure Blueprint-aware session diagnostics.
 * Observational only — does not mutate or persist the session.
 */
export function evaluateSessionDiagnostics(
  session: ResearchSession,
  blueprint: Blueprint,
): SessionDiagnosticsReport {
  const diagnostics: SessionDiagnostic[] = [];

  const blueprintId = session.blueprintId;
  if (blueprintId.length > 0 && blueprintId !== blueprintId.trim()) {
    diagnostics.push({
      code: "SESSION_BLUEPRINT_WHITESPACE",
      severity: "warning",
      message: "The stored Blueprint identifier has leading or trailing spaces.",
      field: "blueprintId",
      recoverable: true,
    });
  }

  if (session.currentQuestionIndex < 0) {
    diagnostics.push({
      code: "CURRENT_INDEX_BELOW_RANGE",
      severity: "warning",
      message: "The current question index is below the valid range.",
      field: "currentQuestionIndex",
      recoverable: true,
    });
  }

  if (
    blueprint.questions.length > 0 &&
    session.currentQuestionIndex >= blueprint.questions.length
  ) {
    diagnostics.push({
      code: "CURRENT_INDEX_ABOVE_RANGE",
      severity: "warning",
      message: "The current question index is beyond the Blueprint question list.",
      field: "currentQuestionIndex",
      recoverable: true,
    });
  }

  const knownQuestionIds = new Set(blueprint.questions.map((question) => question.id));
  for (const answer of session.answers) {
    if (!answer.questionId) continue;
    if (!knownQuestionIds.has(answer.questionId)) {
      diagnostics.push({
        code: "ANSWER_QUESTION_UNKNOWN",
        severity: "warning",
        message: `An answer references question "${answer.questionId}" which is not in the active Blueprint.`,
        field: "answers",
        entityId: answer.questionId,
        recoverable: true,
      });
    }
  }

  const counts = new Map<string, number>();
  for (const answer of session.answers) {
    if (!answer.questionId) continue;
    counts.set(answer.questionId, (counts.get(answer.questionId) ?? 0) + 1);
  }
  const reportedDuplicates = new Set<string>();
  for (const answer of session.answers) {
    const questionId = answer.questionId;
    if (!questionId) continue;
    if ((counts.get(questionId) ?? 0) > 1 && !reportedDuplicates.has(questionId)) {
      reportedDuplicates.add(questionId);
      diagnostics.push({
        code: "ANSWER_QUESTION_DUPLICATE",
        severity: "warning",
        message: `More than one answer is stored for question "${questionId}".`,
        field: "answers",
        entityId: questionId,
        recoverable: true,
      });
    }
  }

  if (session.decision) {
    const alternativeId = session.decision.alternativeId;
    const known = blueprint.alternatives.some((alternative) => alternative.id === alternativeId);
    if (!known) {
      diagnostics.push({
        code: "DECISION_ALTERNATIVE_UNKNOWN",
        severity: "error",
        message: "The saved decision no longer matches an available option.",
        field: "decision.alternativeId",
        entityId: alternativeId,
        recoverable: true,
      });
    }
  }

  if (session.completed && !session.decision) {
    diagnostics.push({
      code: "COMPLETED_WITHOUT_DECISION",
      severity: "warning",
      message: "The session is marked completed but has no decision.",
      field: "decision",
      recoverable: true,
    });
  }

  return {
    diagnostics,
    hasErrors: diagnostics.some((diagnostic) => diagnostic.severity === "error"),
    hasWarnings: diagnostics.some((diagnostic) => diagnostic.severity === "warning"),
  };
}

/** Pure presentation helper for the layout banner (testable without React). */
export function formatSessionDiagnosticsBanner(
  report: SessionDiagnosticsReport,
): { summary: string; detail: string } | null {
  if (!report.hasWarnings && !report.hasErrors) {
    return null;
  }

  const total = report.diagnostics.length;
  const errorCount = report.diagnostics.filter((d) => d.severity === "error").length;
  const warningCount = report.diagnostics.filter((d) => d.severity === "warning").length;

  const parts: string[] = [];
  if (errorCount > 0) {
    parts.push(`${errorCount} error${errorCount === 1 ? "" : "s"}`);
  }
  if (warningCount > 0) {
    parts.push(`${warningCount} warning${warningCount === 1 ? "" : "s"}`);
  }

  const issueWord = total === 1 ? "issue" : "issues";
  const summary = `Session check: ${total} ${issueWord} detected — ${parts.join(" and ")}.`;
  const detail = report.diagnostics[0]?.message ?? "";

  return { summary, detail };
}
