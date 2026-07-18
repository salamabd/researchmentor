import { describe, expect, it } from "vitest";
import type { BlueprintPurpose } from "../domain/types";
import { bp001 } from "./BP-001/blueprint";
import { BLUEPRINT_PURPOSES, parseBlueprint, safeParseBlueprint } from "./schema";

describe("blueprint schema", () => {
  it("accepts the BP-001 definition", () => {
    expect(parseBlueprint(bp001).id).toBe("BP-001");
    expect(parseBlueprint(bp001).purpose).toBe("decision");
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
});
