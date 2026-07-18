import { describe, expect, it } from "vitest";
import { createBlueprintRegistry } from "../registry";
import { parseBlueprint } from "../schema";
import { bp001, mockAlternatives } from "./blueprint";

describe("BP-001", () => {
  it("is a decision-purpose blueprint with ten ordered questions", () => {
    expect(bp001.id).toBe("BP-001");
    expect(bp001.version).toBe("1.0.0");
    expect(bp001.purpose).toBe("decision");
    expect(bp001.questions).toHaveLength(10);
    expect(bp001.questions.map((q) => q.id)).toEqual([
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
    ]);
    expect(bp001.questions[0]?.text).toBe("What made you interested in this issue?");
    expect(bp001.questions[9]?.text).toBe("What has changed in your thinking since you began?");
  });

  it("includes three BUILD-001 alternatives", () => {
    expect(bp001.alternatives).toHaveLength(3);
    expect(bp001.alternatives.map((a) => a.id)).toEqual(["A", "B", "C"]);
    expect(mockAlternatives).toBe(bp001.alternatives);
    expect(bp001.alternatives[0]?.title).toBe("Narrow organisational case");
  });

  it("passes structural validation and registry lookup", () => {
    expect(parseBlueprint(bp001).purpose).toBe("decision");
    const registry = createBlueprintRegistry([bp001]);
    expect(registry.getById("BP-001").purpose).toBe("decision");
  });
});
