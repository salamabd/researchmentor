import { describe, expect, it } from "vitest";
import {
  createNewSession,
  determineSessionStatus,
  hasMeaningfulProgress,
  markCompleted,
  normaliseLoadedSession,
  upsertAnswer,
  withInitialIdea,
} from "./session";

const NOW = "2026-07-18T12:00:00.000Z";

describe("ResearchSession domain", () => {
  it("creates a new not_started session", () => {
    const session = createNewSession(NOW, "id-1");
    expect(session.id).toBe("id-1");
    expect(session.blueprintId).toBe("BP-001");
    expect(session.status).toBe("not_started");
    expect(session.completed).toBe(false);
    expect(session.answers).toEqual([]);
    expect(session.initialIdea).toBe("");
    expect(hasMeaningfulProgress(session)).toBe(false);
  });

  it("detects meaningful progress and lifecycle", () => {
    let session = createNewSession(NOW, "id-2");
    expect(determineSessionStatus(session)).toBe("not_started");

    session = withInitialIdea(session, "A concrete research interest about retention", NOW);
    expect(hasMeaningfulProgress(session)).toBe(true);
    expect(determineSessionStatus(session)).toBe("in_progress");

    session = upsertAnswer(session, "Q1", "Because of workplace observation", NOW);
    expect(session.answers).toHaveLength(1);

    session = markCompleted(session, NOW);
    expect(session.completed).toBe(true);
    expect(session.status).toBe("completed");
    expect(session.completedAt).toBe(NOW);
  });

  it("upserts answers by question id", () => {
    let session = createNewSession(NOW, "id-3");
    session = upsertAnswer(session, "Q1", "first", NOW);
    session = upsertAnswer(session, "Q2", "second", NOW);
    session = upsertAnswer(session, "Q1", "revised", NOW);
    expect(session.answers).toEqual([
      { questionId: "Q2", text: "second" },
      { questionId: "Q1", text: "revised" },
    ]);
  });

  it("normalises a BUILD-001 zustand persist payload", () => {
    const legacy = {
      state: {
        profile: {
          degreeLevel: "PhD",
          discipline: "Finance",
          researchExperience: "moderate",
          professionalContext: "Banking",
        },
        initialIdea: "Why do branch staff leave?",
        answers: [{ questionId: "Q1", text: "Observed high turnover" }],
        currentQuestionIndex: 2,
        decision: {
          alternativeId: "A",
          justification: "Feasible organisational case with access",
          confidence: 70,
        },
        supervisorFeedback: "Clear reasoning path",
        completed: true,
      },
      version: 0,
    };

    const session = normaliseLoadedSession(legacy, NOW, "fallback-id");
    expect(session).not.toBeNull();
    expect(session?.profile.discipline).toBe("Finance");
    expect(session?.initialIdea).toBe("Why do branch staff leave?");
    expect(session?.answers).toEqual([{ questionId: "Q1", text: "Observed high turnover" }]);
    expect(session?.currentQuestionIndex).toBe(2);
    expect(session?.decision?.alternativeId).toBe("A");
    expect(session?.supervisorFeedback).toBe("Clear reasoning path");
    expect(session?.completed).toBe(true);
    expect(session?.status).toBe("completed");
    expect(session?.blueprintId).toBe("BP-001");
  });

  it("returns null for unusable payloads", () => {
    expect(normaliseLoadedSession(null, NOW, "x")).toBeNull();
    expect(normaliseLoadedSession({ foo: 1 }, NOW, "x")).toBeNull();
  });
});
