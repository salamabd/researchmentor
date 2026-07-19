import { describe, expect, it } from "vitest";
import type { BlueprintPurpose } from "../domain/types";
import { bp001 } from "./BP-001/blueprint";
import { BLUEPRINT_PURPOSES, parseBlueprint, safeParseBlueprint } from "./schema";

describe("blueprint schema", () => {
  it("accepts the BP-001 definition", () => {
    expect(parseBlueprint(bp001).id).toBe("BP-001");
    expect(parseBlueprint(bp001).purpose).toBe("decision");
    expect(parseBlueprint(bp001).journeyStages).toHaveLength(8);
  });

  it("rejects missing blueprint id", () => {
    const result = safeParseBlueprint({ ...bp001, id: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing purpose", () => {
    const { purpose: _purpose, ...withoutPurpose } = bp001;
    const result = safeParseBlueprint(withoutPurpose);
    expect(result.success).toBe(false);
  });

  it("rejects an unsupported purpose", () => {
    const result = safeParseBlueprint({ ...bp001, purpose: "diagnosis" });
    expect(result.success).toBe(false);
  });

  it("accepts all approved purpose identifiers when otherwise valid", () => {
    for (const purpose of BLUEPRINT_PURPOSES) {
      const parsed = parseBlueprint({ ...bp001, purpose });
      expect(parsed.purpose).toBe(purpose as BlueprintPurpose);
    }
  });

  it("rejects duplicate question ids", () => {
    const result = safeParseBlueprint({
      ...bp001,
      questions: [bp001.questions[0], { ...bp001.questions[0], stage: "Other" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty question prompts", () => {
    const result = safeParseBlueprint({
      ...bp001,
      questions: [{ ...bp001.questions[0], text: "   " }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid alternatives", () => {
    const result = safeParseBlueprint({
      ...bp001,
      alternatives: [{ ...bp001.alternatives[0], id: "" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects duplicate alternative ids", () => {
    const result = safeParseBlueprint({
      ...bp001,
      alternatives: [bp001.alternatives[0], { ...bp001.alternatives[1], id: "A" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing required journey stage", () => {
    const result = safeParseBlueprint({
      ...bp001,
      journeyStages: bp001.journeyStages.filter((s) => s.id !== "PROBLEM_FORMULATION"),
    });
    expect(result.success).toBe(false);
  });

  it("rejects duplicate journey stage ids", () => {
    const result = safeParseBlueprint({
      ...bp001,
      journeyStages: [...bp001.journeyStages.slice(0, 7), bp001.journeyStages[0]],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown referenced question id", () => {
    const stages = bp001.journeyStages.map((stage) =>
      stage.id === "CONTEXT"
        ? { ...stage, questionIds: ["Q1", "Q99"], requiredQuestionIds: ["Q1", "Q99"] }
        : stage,
    );
    const result = safeParseBlueprint({ ...bp001, journeyStages: stages });
    expect(result.success).toBe(false);
  });

  it("rejects a required question that is not in the stage question list", () => {
    const stages = bp001.journeyStages.map((stage) =>
      stage.id === "CONTEXT"
        ? { ...stage, questionIds: ["Q1"], requiredQuestionIds: ["Q1", "Q3"] }
        : stage,
    );
    const result = safeParseBlueprint({ ...bp001, journeyStages: stages });
    expect(result.success).toBe(false);
  });

  it("rejects duplicate required question ids within a stage", () => {
    const stages = bp001.journeyStages.map((stage) =>
      stage.id === "CONTEXT"
        ? { ...stage, questionIds: ["Q1", "Q3"], requiredQuestionIds: ["Q1", "Q1"] }
        : stage,
    );
    const result = safeParseBlueprint({ ...bp001, journeyStages: stages });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid journey stage sequence", () => {
    const swapped = [...bp001.journeyStages];
    const tmp = swapped[1]!;
    swapped[1] = swapped[2]!;
    swapped[2] = tmp;
    const result = safeParseBlueprint({ ...bp001, journeyStages: swapped });
    expect(result.success).toBe(false);
  });
});
