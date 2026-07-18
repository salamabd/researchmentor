import { describe, it, expect } from "vitest";
import { bp001 } from "./blueprint";
describe("BP-001", () => {
  it("has ten ordered mentoring questions", () => {
    expect(bp001.id).toBe("BP-001");
    expect(bp001.questions).toHaveLength(10);
    expect(new Set(bp001.questions.map((q) => q.id)).size).toBe(10);
  });
});
