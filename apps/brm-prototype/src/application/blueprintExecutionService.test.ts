import { describe, expect, it, vi } from "vitest";
import { bp001 } from "../blueprints/BP-001/blueprint";
import { createBlueprintRegistry } from "../blueprints/registry";
import { createNewSession, normaliseLoadedSession, withDecision } from "../domain/session";
import type { ResearchSession } from "../domain/types";
import { InMemoryResearchSessionRepository } from "../persistence/inMemoryResearchSessionRepository";
import type { ResearchSessionRepository } from "../persistence/researchSessionRepository";
import { BlueprintExecutionService } from "./blueprintExecutionService";
import { InvalidBlueprintAlternativeError, UnknownBlueprintError } from "./errors";
import { createSessionService } from "./sessionService";

const NOW = "2026-07-18T20:00:00.000Z";

function createHarness(initial?: ResearchSession) {
  const repository = new InMemoryResearchSessionRepository();
  if (initial) {
    repository.save(initial);
  }
  const sessionService = createSessionService({
    repository,
    clock: { nowIso: () => NOW },
    ids: { nextId: () => "session-1" },
  });
  const registry = createBlueprintRegistry([bp001]);
  const execution = new BlueprintExecutionService(sessionService, registry);
  return { repository, sessionService, registry, execution };
}

function createCountingHarness(initial?: ResearchSession) {
  const inner = new InMemoryResearchSessionRepository();
  if (initial) {
    inner.save(initial);
  }
  const save = vi.fn((session: ResearchSession) => {
    inner.save(session);
  });
  const repository: ResearchSessionRepository = {
    load: () => inner.load(),
    save,
    clear: () => inner.clear(),
  };
  const sessionService = createSessionService({
    repository,
    clock: { nowIso: () => NOW },
    ids: { nextId: () => "session-1" },
  });
  const registry = createBlueprintRegistry([bp001]);
  const execution = new BlueprintExecutionService(sessionService, registry);
  return { save, execution, sessionService };
}

describe("BlueprintExecutionService", () => {
  it("resolves the active Blueprint from the session blueprintId", () => {
    const { execution } = createHarness();
    const blueprint = execution.getActiveBlueprint();
    expect(blueprint.id).toBe("BP-001");
    expect(blueprint.purpose).toBe("decision");
    expect(blueprint.questions).toHaveLength(10);
  });

  it("throws UnknownBlueprintError for an explicit unknown blueprint id", () => {
    const bad = createNewSession(NOW, "s-unknown");
    bad.blueprintId = "BP-999";
    const { execution } = createHarness(bad);
    expect(() => execution.getActiveBlueprint()).toThrow(UnknownBlueprintError);
    expect(() => execution.getActiveBlueprint()).toThrow(/BP-999/);
    expect(execution.getSession().blueprintId).toBe("BP-999");
    expect(execution.getSession().answers).toEqual([]);
  });

  it("normalises missing legacy blueprintId to BP-001 at the loading boundary", () => {
    const legacy = {
      state: {
        profile: {
          degreeLevel: "MBA",
          discipline: "Management",
          researchExperience: "limited",
          professionalContext: "",
        },
        initialIdea: "Legacy idea",
        answers: [],
        currentQuestionIndex: 0,
        supervisorFeedback: "",
        completed: false,
      },
      version: 0,
    };
    const normalised = normaliseLoadedSession(legacy, NOW, "legacy-1");
    expect(normalised?.blueprintId).toBe("BP-001");
    const { execution } = createHarness(normalised!);
    expect(execution.getActiveBlueprint().id).toBe("BP-001");
  });

  it("resolves the current question from the active Blueprint and session index", () => {
    const session = createNewSession(NOW, "s-q");
    session.currentQuestionIndex = 2;
    const { execution } = createHarness(session);
    expect(execution.getCurrentQuestion().id).toBe("Q3");
    expect(execution.getCurrentQuestion().text).toBe("Who experiences this problem most directly?");
  });

  it("navigates next using the active Blueprint question count and clamps at the end", () => {
    const session = createNewSession(NOW, "s-nav");
    session.currentQuestionIndex = 8;
    const { execution } = createHarness(session);
    execution.goToNextQuestion();
    expect(execution.getSession().currentQuestionIndex).toBe(9);
    execution.goToNextQuestion();
    expect(execution.getSession().currentQuestionIndex).toBe(9);
  });

  it("retains previous-question lower-bound behaviour", () => {
    const { execution } = createHarness();
    execution.goToPreviousQuestion();
    expect(execution.getSession().currentQuestionIndex).toBe(0);
  });

  it("saves a valid alternative and rejects an unknown alternative", () => {
    const { execution } = createHarness();
    const saved = execution.saveDecision({
      alternativeId: "A",
      justification: "Clear organisational access supports this direction for the study",
      confidence: 70,
    });
    expect(saved.decision?.alternativeId).toBe("A");

    expect(() =>
      execution.saveDecision({
        alternativeId: "Z",
        justification: "This alternative does not exist on the blueprint",
        confidence: 50,
      }),
    ).toThrow(InvalidBlueprintAlternativeError);
    expect(execution.getSession().decision?.alternativeId).toBe("A");
  });

  it("preserves an invalid stored decision rather than deleting it", () => {
    let session = createNewSession(NOW, "s-invalid-decision");
    session = withDecision(
      session,
      {
        alternativeId: "Z",
        justification: "Legacy invalid alternative retained from earlier state",
        confidence: 40,
      },
      NOW,
    );
    const { execution } = createHarness(session);
    expect(execution.getSession().decision?.alternativeId).toBe("Z");
    const record = execution.createDecisionRecord();
    expect(record.decision?.alternativeId).toBe("Z");
    expect(record.selectedDirection).toBeUndefined();
  });

  it("creates a BUILD-001 compatible Decision Record using active Blueprint alternatives", () => {
    let session = createNewSession(NOW, "s-record");
    session.initialIdea = "Staff retention in retail operations";
    session = withDecision(
      session,
      {
        alternativeId: "B",
        justification: "Comparative insight is appropriate given the research question",
        confidence: 65,
      },
      NOW,
    );
    const { execution } = createHarness(session);
    const record = execution.createDecisionRecord();
    expect(record.blueprint).toBe("BP-001");
    expect(record.selectedDirection?.id).toBe("B");
    expect(record.selectedDirection?.title).toBe("Cross-sectional industry study");
    expect(record).toMatchObject({
      profile: session.profile,
      initialIdea: session.initialIdea,
      answers: [],
      supervisorFeedback: "",
      completed: false,
      exportedAt: NOW,
    });
  });

  it("getSessionDiagnostics resolves the active Blueprint and returns an empty report for a clean session", () => {
    const { execution } = createHarness();
    const report = execution.getSessionDiagnostics();
    expect(execution.getActiveBlueprint().id).toBe("BP-001");
    expect(report.diagnostics).toEqual([]);
    expect(report.hasErrors).toBe(false);
    expect(report.hasWarnings).toBe(false);
  });

  it("throws UnknownBlueprintError from getSessionDiagnostics and leaves the session unchanged", () => {
    const bad = createNewSession(NOW, "s-diag-unknown");
    bad.blueprintId = "BP-999";
    bad.answers = [{ questionId: "Q1", text: "Preserve me" }];
    const { execution } = createHarness(bad);
    expect(() => execution.getSessionDiagnostics()).toThrow(UnknownBlueprintError);
    expect(execution.getSession().blueprintId).toBe("BP-999");
    expect(execution.getSession().answers).toEqual([{ questionId: "Q1", text: "Preserve me" }]);
  });

  it("reports an unknown stored answer and keeps it in the session", () => {
    const session = createNewSession(NOW, "s-orphan-answer");
    session.answers = [{ questionId: "Q99", text: "Orphan retained" }];
    const { execution } = createHarness(session);
    const report = execution.getSessionDiagnostics();
    expect(report.diagnostics.some((d) => d.code === "ANSWER_QUESTION_UNKNOWN")).toBe(true);
    expect(execution.getSession().answers).toEqual([
      { questionId: "Q99", text: "Orphan retained" },
    ]);
  });

  it("reports an unknown stored decision and keeps it in the session", () => {
    let session = createNewSession(NOW, "s-orphan-decision");
    session = withDecision(
      session,
      {
        alternativeId: "Z",
        justification: "Invalid alternative retained for diagnostics",
        confidence: 35,
      },
      NOW,
    );
    const { execution } = createHarness(session);
    const report = execution.getSessionDiagnostics();
    expect(report.diagnostics.some((d) => d.code === "DECISION_ALTERNATIVE_UNKNOWN")).toBe(true);
    expect(execution.getSession().decision?.alternativeId).toBe("Z");
  });

  it("still rejects invalid newly submitted decisions after diagnostics exist", () => {
    let session = createNewSession(NOW, "s-reject-new");
    session = withDecision(
      session,
      {
        alternativeId: "Z",
        justification: "Stored invalid",
        confidence: 20,
      },
      NOW,
    );
    const { execution } = createHarness(session);
    expect(execution.getSessionDiagnostics().hasErrors).toBe(true);
    expect(() =>
      execution.saveDecision({
        alternativeId: "Y",
        justification: "Another invalid alternative must still be rejected",
        confidence: 50,
      }),
    ).toThrow(InvalidBlueprintAlternativeError);
    expect(execution.getSession().decision?.alternativeId).toBe("Z");
  });

  it("does not trigger repository save when evaluating diagnostics", () => {
    const { save, execution } = createCountingHarness();
    const savesBefore = save.mock.calls.length;
    execution.getSessionDiagnostics();
    expect(save.mock.calls.length).toBe(savesBefore);
  });

  it("reflects the current session after a valid mutation", () => {
    const { execution, sessionService } = createHarness();
    expect(execution.getSessionDiagnostics().diagnostics).toEqual([]);
    sessionService.saveAnswer("Q99", "Added after load");
    const report = execution.getSessionDiagnostics();
    expect(report.diagnostics.some((d) => d.code === "ANSWER_QUESTION_UNKNOWN")).toBe(true);
    expect(report.diagnostics.find((d) => d.code === "ANSWER_QUESTION_UNKNOWN")?.entityId).toBe(
      "Q99",
    );
  });
});
