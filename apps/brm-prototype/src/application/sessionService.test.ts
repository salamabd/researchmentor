import { describe, expect, it } from "vitest";
import { InMemoryResearchSessionRepository } from "../persistence/inMemoryResearchSessionRepository";
import { createSessionService } from "./sessionService";

describe("SessionService", () => {
  it("loads or creates, persists updates, and resets", () => {
    const repository = new InMemoryResearchSessionRepository();
    let now = "2026-07-18T08:00:00.000Z";
    let id = 0;
    const service = createSessionService({
      repository,
      clock: { nowIso: () => now },
      ids: {
        nextId: () => {
          id += 1;
          return `sid-${id}`;
        },
      },
    });

    expect(service.getSession().id).toBe("sid-1");
    expect(repository.load()?.id).toBe("sid-1");

    now = "2026-07-18T08:01:00.000Z";
    service.updateInitialIdea("An idea with enough detail for the journey");
    expect(repository.load()?.initialIdea).toBe("An idea with enough detail for the journey");
    expect(repository.load()?.status).toBe("in_progress");

    service.saveAnswer("Q1", "Motivation response");
    service.goToNextQuestion(10);
    expect(repository.load()?.currentQuestionIndex).toBe(1);
    expect(repository.load()?.answers).toHaveLength(1);

    service.saveDecision({
      alternativeId: "B",
      justification: "Broader industry comparison is appropriate here",
      confidence: 65,
    });
    service.saveSupervisorFeedback("Good justification");
    service.markComplete();
    expect(repository.load()?.completed).toBe(true);
    expect(repository.load()?.status).toBe("completed");

    const record = service.createDecisionRecordExport([
      {
        id: "B",
        title: "Cross-sectional industry study",
        description: "Compare across organisations",
        strengths: ["Broader relevance"],
        risks: ["Harder recruitment"],
      },
    ]);
    expect(record.blueprint).toBe("BP-001");
    expect(record.selectedDirection?.id).toBe("B");
    expect(record.completed).toBe(true);

    now = "2026-07-18T08:02:00.000Z";
    service.reset();
    expect(service.getSession().id).toBe("sid-2");
    expect(service.getSession().status).toBe("not_started");
    expect(repository.load()?.initialIdea).toBe("");
  });

  it("creates a new session when repository is empty", () => {
    const repository = new InMemoryResearchSessionRepository();
    const service = createSessionService({
      repository,
      clock: { nowIso: () => "2026-07-18T09:00:00.000Z" },
      ids: { nextId: () => "empty-1" },
    });
    expect(service.getSession().id).toBe("empty-1");
    expect(repository.load()).not.toBeNull();
  });
});
