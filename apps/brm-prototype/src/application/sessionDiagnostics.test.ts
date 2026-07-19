import { describe, expect, it } from "vitest";
import { bp001 } from "../blueprints/BP-001/blueprint";
import { createNewSession, withDecision } from "../domain/session";
import type { ResearchSession } from "../domain/types";
import { evaluateSessionDiagnostics, formatSessionDiagnosticsBanner } from "./sessionDiagnostics";

const NOW = "2026-07-19T08:00:00.000Z";

function snapshot(value: unknown): string {
  return JSON.stringify(value);
}

describe("evaluateSessionDiagnostics", () => {
  it("returns no diagnostics for a clean default BP-001 session", () => {
    const session = createNewSession(NOW, "clean-1");
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics).toEqual([]);
    expect(report.hasErrors).toBe(false);
    expect(report.hasWarnings).toBe(false);
  });

  it("does not diagnose unanswered Blueprint questions", () => {
    const session = createNewSession(NOW, "unanswered-1");
    session.answers = [{ questionId: "Q1", text: "Only first answered" }];
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics).toEqual([]);
  });

  it("diagnoses whitespace Blueprint identifiers without mutating the session", () => {
    const session = createNewSession(NOW, "ws-1");
    session.blueprintId = " BP-001 ";
    const before = snapshot(session);
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics).toHaveLength(1);
    expect(report.diagnostics[0]).toMatchObject({
      code: "SESSION_BLUEPRINT_WHITESPACE",
      severity: "warning",
      field: "blueprintId",
    });
    expect(report.hasWarnings).toBe(true);
    expect(snapshot(session)).toBe(before);
    expect(session.blueprintId).toBe(" BP-001 ");
  });

  it("diagnoses unknown answer question identifiers", () => {
    const session = createNewSession(NOW, "orphan-1");
    session.answers = [{ questionId: "Q99", text: "Orphan student work" }];
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics).toHaveLength(1);
    expect(report.diagnostics[0]).toMatchObject({
      code: "ANSWER_QUESTION_UNKNOWN",
      severity: "warning",
      field: "answers",
      entityId: "Q99",
    });
  });

  it("preserves unknown answers after evaluation", () => {
    const session = createNewSession(NOW, "orphan-2");
    session.answers = [{ questionId: "QX", text: "Keep me" }];
    evaluateSessionDiagnostics(session, bp001);
    expect(session.answers).toEqual([{ questionId: "QX", text: "Keep me" }]);
  });

  it("emits one duplicate diagnostic per duplicated question id and preserves all answers", () => {
    const session = createNewSession(NOW, "dup-1");
    session.answers = [
      { questionId: "Q1", text: "first" },
      { questionId: "Q2", text: "other" },
      { questionId: "Q1", text: "second" },
      { questionId: "Q2", text: "other-2" },
    ];
    const before = snapshot(session.answers);
    const report = evaluateSessionDiagnostics(session, bp001);
    const duplicates = report.diagnostics.filter((d) => d.code === "ANSWER_QUESTION_DUPLICATE");
    expect(duplicates).toHaveLength(2);
    expect(duplicates.map((d) => d.entityId)).toEqual(["Q1", "Q2"]);
    expect(snapshot(session.answers)).toBe(before);
  });

  it("diagnoses a negative current question index", () => {
    const session = createNewSession(NOW, "idx-neg");
    session.currentQuestionIndex = -3;
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics.some((d) => d.code === "CURRENT_INDEX_BELOW_RANGE")).toBe(true);
  });

  it("diagnoses an index equal to the Blueprint question length", () => {
    const session = createNewSession(NOW, "idx-eq");
    session.currentQuestionIndex = bp001.questions.length;
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics.some((d) => d.code === "CURRENT_INDEX_ABOVE_RANGE")).toBe(true);
  });

  it("diagnoses an index greater than the Blueprint question length", () => {
    const session = createNewSession(NOW, "idx-gt");
    session.currentQuestionIndex = bp001.questions.length + 5;
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics.some((d) => d.code === "CURRENT_INDEX_ABOVE_RANGE")).toBe(true);
  });

  it("diagnoses an unknown stored decision alternative and preserves it", () => {
    let session = createNewSession(NOW, "dec-bad");
    session = withDecision(
      session,
      {
        alternativeId: "Z",
        justification: "Legacy invalid alternative retained",
        confidence: 40,
      },
      NOW,
    );
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.hasErrors).toBe(true);
    expect(report.diagnostics.some((d) => d.code === "DECISION_ALTERNATIVE_UNKNOWN")).toBe(true);
    expect(report.diagnostics.find((d) => d.code === "DECISION_ALTERNATIVE_UNKNOWN")).toMatchObject(
      {
        severity: "error",
        field: "decision.alternativeId",
        entityId: "Z",
      },
    );
    expect(session.decision?.alternativeId).toBe("Z");
  });

  it("diagnoses a completed session without a decision", () => {
    const session = createNewSession(NOW, "done-no-dec");
    session.completed = true;
    session.status = "completed";
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics.some((d) => d.code === "COMPLETED_WITHOUT_DECISION")).toBe(true);
  });

  it("does not warn about a missing decision on an incomplete session", () => {
    const session = createNewSession(NOW, "incomplete");
    session.completed = false;
    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics.some((d) => d.code === "COMPLETED_WITHOUT_DECISION")).toBe(false);
  });

  it("orders diagnostics deterministically", () => {
    const session = createNewSession(NOW, "order-1");
    session.blueprintId = " BP-001 ";
    session.currentQuestionIndex = 99;
    session.answers = [
      { questionId: "Q99", text: "orphan" },
      { questionId: "Q1", text: "a" },
      { questionId: "Q1", text: "b" },
    ];
    session.decision = {
      alternativeId: "Z",
      justification: "Invalid stored option",
      confidence: 10,
    };
    session.completed = true;

    const report = evaluateSessionDiagnostics(session, bp001);
    expect(report.diagnostics.map((d) => d.code)).toEqual([
      "SESSION_BLUEPRINT_WHITESPACE",
      "CURRENT_INDEX_ABOVE_RANGE",
      "ANSWER_QUESTION_UNKNOWN",
      "ANSWER_QUESTION_DUPLICATE",
      "DECISION_ALTERNATIVE_UNKNOWN",
      // completed WITH decision — no COMPLETED_WITHOUT_DECISION
    ]);
  });

  it("does not mutate the supplied session or Blueprint", () => {
    const session = createNewSession(NOW, "immutable-1");
    session.answers = [{ questionId: "Q99", text: "x" }];
    const sessionBefore = snapshot(session);
    const blueprintBefore = snapshot(bp001);
    evaluateSessionDiagnostics(session, bp001);
    expect(snapshot(session)).toBe(sessionBefore);
    expect(snapshot(bp001)).toBe(blueprintBefore);
  });
});

describe("formatSessionDiagnosticsBanner", () => {
  it("returns null for a clean report", () => {
    expect(
      formatSessionDiagnosticsBanner({
        diagnostics: [],
        hasErrors: false,
        hasWarnings: false,
      }),
    ).toBeNull();
  });

  it("formats issue counts and the first message", () => {
    const session: ResearchSession = createNewSession(NOW, "banner-1");
    session.answers = [{ questionId: "Q99", text: "orphan" }];
    session.decision = {
      alternativeId: "Z",
      justification: "bad",
      confidence: 1,
    };
    const report = evaluateSessionDiagnostics(session, bp001);
    const banner = formatSessionDiagnosticsBanner(report);
    expect(banner).not.toBeNull();
    expect(banner?.summary).toMatch(/Session check:/);
    expect(banner?.summary).toMatch(/error/);
    expect(banner?.summary).toMatch(/warning/);
    expect(banner?.detail).toBe(report.diagnostics[0]?.message);
  });
});
