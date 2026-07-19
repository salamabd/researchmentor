import { describe, expect, it } from "vitest";
import { RESEARCH_JOURNEY_STAGE_IDS } from "../../domain/types";
import { createBlueprintRegistry } from "../registry";
import { parseBlueprint } from "../schema";
import { bp001, mockAlternatives } from "./blueprint";

describe("BP-001", () => {
  it("is a decision-purpose blueprint with preserved Q1–Q10 and BUILD-006 additions", () => {
    expect(bp001.id).toBe("BP-001");
    expect(bp001.version).toBe("1.0.0");
    expect(bp001.purpose).toBe("decision");
    expect(bp001.questions.map((q) => q.id)).toEqual([
      "ORIENTATION_ACK",
      "Q1",
      "Q2",
      "Q3",
      "Q4",
      "Q5",
      "Q6",
      "Q7",
      "Q8",
      "Q9",
      "Q10",
      "Q11",
      "Q12",
      "Q13",
      "Q14",
      "Q15",
    ]);
    expect(bp001.questions.find((q) => q.id === "Q1")?.text).toBe(
      "What made you interested in this issue?",
    );
    expect(bp001.questions.find((q) => q.id === "Q10")?.text).toBe(
      "What has changed in your thinking since you began?",
    );
  });

  it("includes three BUILD-001 alternatives", () => {
    expect(bp001.alternatives).toHaveLength(3);
    expect(bp001.alternatives.map((a) => a.id)).toEqual(["A", "B", "C"]);
    expect(mockAlternatives).toBe(bp001.alternatives);
    expect(bp001.alternatives[0]?.title).toBe("Narrow organisational case");
  });

  it("declares the eight BUILD-006 journey stages in order with Orientation objectives", () => {
    expect(bp001.journeyStages.map((s) => s.id)).toEqual([...RESEARCH_JOURNEY_STAGE_IDS]);
    const orientation = bp001.journeyStages[0];
    expect(orientation?.learningObjectives).toEqual([
      "Explain the research decision being made.",
      "Distinguish a broad topic from a researchable business problem.",
      "Identify important constraints.",
      "Compare viable alternatives.",
      "Justify a selected direction.",
      "Recognise remaining uncertainty.",
      "Identify the next research action.",
    ]);
    expect(bp001.journeyStages.find((s) => s.id === "PROBLEM_FORMULATION")).toBeTruthy();
  });

  it("passes structural validation and registry lookup", () => {
    expect(parseBlueprint(bp001).purpose).toBe("decision");
    const registry = createBlueprintRegistry([bp001]);
    expect(registry.getById("BP-001").purpose).toBe("decision");
    expect(registry.getById("BP-001").journeyStages).toHaveLength(8);
  });
});
