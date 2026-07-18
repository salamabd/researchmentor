import { BP001_ID } from "../domain/session";
import type {
  Blueprint,
  BlueprintQuestion,
  Decision,
  DecisionRecord,
  ResearchSession,
} from "../domain/types";
import type { BlueprintRegistry } from "../blueprints/registry";
import type { SessionService } from "./sessionService";
import {
  InvalidBlueprintAlternativeError,
  NoCurrentQuestionError,
  UnknownBlueprintError,
} from "./errors";

/**
 * Application coordinator for Blueprint-aware session operations.
 * Composes SessionService + BlueprintRegistry; does not own persistence or React state.
 */
export class BlueprintExecutionService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly blueprintRegistry: BlueprintRegistry,
  ) {}

  getSession(): ResearchSession {
    return this.sessionService.getSession();
  }

  getActiveBlueprint(): Blueprint {
    const session = this.sessionService.getSession();
    const blueprintId = this.resolveBlueprintId(session.blueprintId);
    if (!this.blueprintRegistry.has(blueprintId)) {
      throw new UnknownBlueprintError(blueprintId);
    }
    try {
      return this.blueprintRegistry.getById(blueprintId);
    } catch {
      throw new UnknownBlueprintError(blueprintId);
    }
  }

  getCurrentQuestion(): BlueprintQuestion {
    const session = this.sessionService.getSession();
    const blueprint = this.getActiveBlueprint();
    if (blueprint.questions.length === 0) {
      throw new NoCurrentQuestionError(blueprint.id, session.currentQuestionIndex);
    }
    const maxIndex = blueprint.questions.length - 1;
    const index = Math.min(Math.max(0, session.currentQuestionIndex), maxIndex);
    const question = blueprint.questions[index];
    if (!question) {
      throw new NoCurrentQuestionError(blueprint.id, index);
    }
    return question;
  }

  goToNextQuestion(): ResearchSession {
    const blueprint = this.getActiveBlueprint();
    return this.sessionService.goToNextQuestion(blueprint.questions.length);
  }

  goToPreviousQuestion(): ResearchSession {
    this.getActiveBlueprint();
    return this.sessionService.goToPreviousQuestion();
  }

  saveDecision(decision: Decision): ResearchSession {
    const blueprint = this.getActiveBlueprint();
    const valid = blueprint.alternatives.some((a) => a.id === decision.alternativeId);
    if (!valid) {
      throw new InvalidBlueprintAlternativeError(decision.alternativeId, blueprint.id);
    }
    return this.sessionService.saveDecision(decision);
  }

  createDecisionRecord(): DecisionRecord {
    const blueprint = this.getActiveBlueprint();
    return this.sessionService.createDecisionRecordExport(blueprint.alternatives);
  }

  /**
   * Resolve lookup id. Empty/whitespace uses BP-001 for legacy compatibility
   * without rewriting the stored session identifier here.
   */
  private resolveBlueprintId(blueprintId: string): string {
    const trimmed = blueprintId.trim();
    return trimmed.length === 0 ? BP001_ID : trimmed;
  }
}
