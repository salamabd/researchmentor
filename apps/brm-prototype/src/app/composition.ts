import { createSessionService, type SessionService } from "../application/sessionService";
import { LocalStorageResearchSessionRepository } from "../persistence/localStorageResearchSessionRepository";

const repository = new LocalStorageResearchSessionRepository();

/** Composition root: LocalStorage repository + application session service. */
export const sessionService: SessionService = createSessionService({ repository });
