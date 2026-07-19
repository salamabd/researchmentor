import { describe, expect, it } from "vitest";
import { usePrototypeStore } from "./usePrototypeStore";

/**
 * Lightweight Zustand verification for BUILD-005 / BUILD-006.
 * Journey rules live in the application layer; the store only delegates.
 */
describe("usePrototypeStore application delegation", () => {
  it("exposes getSessionDiagnostics and returns an application-layer report", () => {
    usePrototypeStore.getState().reset();
    const getSessionDiagnostics = usePrototypeStore.getState().getSessionDiagnostics;
    expect(typeof getSessionDiagnostics).toBe("function");
    const report = getSessionDiagnostics();
    expect(report).toEqual({
      diagnostics: [],
      hasErrors: false,
      hasWarnings: false,
    });
  });

  it("exposes journey progress and completion commands without local journey rules", () => {
    usePrototypeStore.getState().reset();
    const state = usePrototypeStore.getState();
    expect(typeof state.getResearchJourneyProgress).toBe("function");
    expect(typeof state.getResearchJourneyStage).toBe("function");
    expect(typeof state.completeResearchJourney).toBe("function");
    expect("complete" in state).toBe(false);
    expect(state.getResearchJourneyProgress().currentStageId).toBe("ORIENTATION");
    expect(state.getResearchJourneyStage("ORIENTATION").learningObjectives?.length).toBe(7);
  });

  it("rejects incomplete journey completion through the store without marking completed", () => {
    usePrototypeStore.getState().reset();
    expect(() => usePrototypeStore.getState().completeResearchJourney()).toThrow(
      /Research journey is incomplete/,
    );
    expect(usePrototypeStore.getState().completed).toBe(false);
  });
});
