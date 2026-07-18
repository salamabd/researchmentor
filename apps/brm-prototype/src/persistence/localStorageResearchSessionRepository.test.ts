import { describe, expect, it } from "vitest";
import { createNewSession, withInitialIdea } from "../domain/session";
import { LocalStorageResearchSessionRepository } from "./localStorageResearchSessionRepository";
import { PROTOTYPE_STORAGE_KEY } from "./storageKey";

function memoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
    map,
  };
}

const NOW = "2026-07-18T10:00:00.000Z";

describe("LocalStorageResearchSessionRepository", () => {
  it("returns null when nothing is stored", () => {
    const storage = memoryStorage();
    const repo = new LocalStorageResearchSessionRepository(
      storage,
      () => NOW,
      () => "id-a",
    );
    expect(repo.load()).toBeNull();
  });

  it("returns null for malformed stored data", () => {
    const storage = memoryStorage();
    storage.setItem(PROTOTYPE_STORAGE_KEY, "{not-json");
    const repo = new LocalStorageResearchSessionRepository(
      storage,
      () => NOW,
      () => "id-b",
    );
    expect(repo.load()).toBeNull();
  });

  it("saves and loads a valid session", () => {
    const storage = memoryStorage();
    const repo = new LocalStorageResearchSessionRepository(
      storage,
      () => NOW,
      () => "id-c",
    );
    const session = withInitialIdea(
      createNewSession(NOW, "id-c"),
      "Feasible topic about onboarding",
      NOW,
    );
    repo.save(session);
    expect(storage.map.has(PROTOTYPE_STORAGE_KEY)).toBe(true);
    const loaded = repo.load();
    expect(loaded?.id).toBe("id-c");
    expect(loaded?.initialIdea).toBe("Feasible topic about onboarding");
    expect(loaded?.status).toBe("in_progress");
  });

  it("clears stored session", () => {
    const storage = memoryStorage();
    const repo = new LocalStorageResearchSessionRepository(
      storage,
      () => NOW,
      () => "id-d",
    );
    repo.save(createNewSession(NOW, "id-d"));
    repo.clear();
    expect(repo.load()).toBeNull();
  });

  it("loads BUILD-001 flattened persist shape", () => {
    const storage = memoryStorage();
    storage.setItem(
      PROTOTYPE_STORAGE_KEY,
      JSON.stringify({
        state: {
          profile: {
            degreeLevel: "MBA",
            discipline: "Management",
            researchExperience: "limited",
            professionalContext: "",
          },
          initialIdea: "Legacy idea from BUILD-001",
          answers: [{ questionId: "Q1", text: "Legacy answer" }],
          currentQuestionIndex: 1,
          supervisorFeedback: "",
          completed: false,
        },
        version: 0,
      }),
    );
    const repo = new LocalStorageResearchSessionRepository(
      storage,
      () => NOW,
      () => "legacy-id",
    );
    const loaded = repo.load();
    expect(loaded?.initialIdea).toBe("Legacy idea from BUILD-001");
    expect(loaded?.answers[0]?.text).toBe("Legacy answer");
    expect(loaded?.currentQuestionIndex).toBe(1);
    expect(loaded?.status).toBe("in_progress");
  });
});
