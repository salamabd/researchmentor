import type { Blueprint } from "../domain/types";
import { parseBlueprint } from "./schema";

export class BlueprintRegistry {
  private readonly byId: Map<string, Blueprint>;

  constructor(blueprints: Blueprint[]) {
    this.byId = new Map(blueprints.map((b) => [b.id, b]));
  }

  getById(id: string): Blueprint {
    const blueprint = this.byId.get(id);
    if (!blueprint) {
      throw new Error(`Unknown blueprint id: ${id}`);
    }
    return blueprint;
  }

  has(id: string): boolean {
    return this.byId.has(id);
  }

  listIds(): string[] {
    return [...this.byId.keys()];
  }
}

/** Validate raw definitions and construct a registry. */
export function createBlueprintRegistry(rawDefinitions: unknown[]): BlueprintRegistry {
  const blueprints = rawDefinitions.map((raw) => parseBlueprint(raw));
  return new BlueprintRegistry(blueprints);
}
