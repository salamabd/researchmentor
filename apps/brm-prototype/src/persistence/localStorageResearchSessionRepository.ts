import { normaliseLoadedSession } from "../domain/session";
import type { ResearchSession } from "../domain/types";
import type { ResearchSessionRepository } from "./researchSessionRepository";
import { PROTOTYPE_STORAGE_KEY } from "./storageKey";

export interface LocalStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function defaultNowIso(): string {
  return new Date().toISOString();
}

function defaultId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}`;
}

export class LocalStorageResearchSessionRepository implements ResearchSessionRepository {
  private readonly storage: LocalStorageLike;
  private readonly nowIso: () => string;
  private readonly nextId: () => string;

  constructor(
    storage: LocalStorageLike = localStorage,
    nowIso: () => string = defaultNowIso,
    nextId: () => string = defaultId,
  ) {
    this.storage = storage;
    this.nowIso = nowIso;
    this.nextId = nextId;
  }

  load(): ResearchSession | null {
    try {
      const raw = this.storage.getItem(PROTOTYPE_STORAGE_KEY);
      if (raw == null || raw.trim() === "") return null;
      const parsed: unknown = JSON.parse(raw);
      return normaliseLoadedSession(parsed, this.nowIso(), this.nextId());
    } catch {
      return null;
    }
  }

  save(session: ResearchSession): void {
    this.storage.setItem(PROTOTYPE_STORAGE_KEY, JSON.stringify(session));
  }

  clear(): void {
    this.storage.removeItem(PROTOTYPE_STORAGE_KEY);
  }
}
