import { createSessionService, type SessionService } from "../application/sessionService";
import { bp001 } from "../blueprints/BP-001/blueprint";
import { createBlueprintRegistry, type BlueprintRegistry } from "../blueprints/registry";
import { LocalStorageResearchSessionRepository } from "../persistence/localStorageResearchSessionRepository";

const repository = new LocalStorageResearchSessionRepository();

/** Validated in-process blueprint registry (BUILD-003). */
export const blueprintRegistry: BlueprintRegistry = createBlueprintRegistry([bp001]);

/** Composition root: LocalStorage repository + application session service. */
export const sessionService: SessionService = createSessionService({ repository });
