import type { ResearchSession } from "../domain/types";

export interface ResearchSessionRepository {
  load(): ResearchSession | null;
  save(session: ResearchSession): void;
  clear(): void;
}
