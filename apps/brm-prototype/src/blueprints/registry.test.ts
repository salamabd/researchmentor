import { describe, expect, it } from "vitest";
import { bp001 } from "./BP-001/blueprint";
import { createBlueprintRegistry } from "./registry";

describe("BlueprintRegistry", () => {
  it("returns BP-001 by id", () => {
    const registry = createBlueprintRegistry([bp001]);
    expect(registry.has("BP-001")).toBe(true);
    expect(registry.getById("BP-001").title).toBe("Choosing a Research Topic");
    expect(registry.listIds()).toEqual(["BP-001"]);
  });

  it("throws for unknown blueprint id", () => {
    const registry = createBlueprintRegistry([bp001]);
    expect(() => registry.getById("BP-999")).toThrow(/Unknown blueprint id/);
  });

  it("rejects invalid definitions at construction", () => {
    expect(() => createBlueprintRegistry([{ ...bp001, id: "" }])).toThrow();
  });
});
