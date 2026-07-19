import { describe, expect, it } from "vitest";
import { bp001 } from "../blueprints/BP-001/blueprint";
import { createNewSession } from "../domain/session";
import {
  deriveResearchJourneyProgress,
  formatJourneyProgressLabel,
  getJourneyStage,
} from "./researchJourney";

/**
 * View-model helpers for journey UI (DOM automation intentionally limited).
 */
describe("journey view helpers", () => {
  it("formats stage position text for Orientation and Problem Formulation", () => {
    const session = createNewSession("2026-07-19T11:00:00.000Z", "view");
    const progress = deriveResearchJourneyProgress(session, bp001);
    expect(formatJourneyProgressLabel(progress, "ORIENTATION")).toBe("Stage 1 of 8");
    expect(formatJourneyProgressLabel(progress, "PROBLEM_FORMULATION")).toBe("Stage 3 of 8");
  });

  it("exposes Orientation learning objectives from Blueprint metadata", () => {
    const orientation = getJourneyStage(bp001, "ORIENTATION");
    expect(orientation.learningObjectives).toContain(
      "Distinguish a broad topic from a researchable business problem.",
    );
  });
});
