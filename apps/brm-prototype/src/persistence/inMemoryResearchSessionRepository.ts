import type { ResearchSession } from "../domain/types";
import type { ResearchSessionRepository } from "./researchSessionRepository";

export class InMemoryResearchSessionRepository implements ResearchSessionRepository {
  private session: ResearchSession | null = null;

  load(): ResearchSession | null {
    return this.session ? structuredClone(this.session) : null;
  }

  save(session: ResearchSession): void {
    this.session = structuredClone(session);
  }

  clear(): void {
    this.session = null;
  }
}
