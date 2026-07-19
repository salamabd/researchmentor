import type {
  Blueprint,
  ResearchJourneyStage,
  ResearchJourneyStageId,
  ResearchSession,
} from "../domain/types";
import { RESEARCH_JOURNEY_STAGE_IDS } from "../domain/types";

export interface JourneyStageCompletion {
  stageId: ResearchJourneyStageId;
  complete: boolean;
  missingRequiredQuestionIds: string[];
  blockingReasons: string[];
}

export interface ResearchJourneyProgress {
  /** Earliest incomplete mandatory stage (recommended resume point). */
  currentStageId: ResearchJourneyStageId;
  completedStageIds: ResearchJourneyStageId[];
  availableStageIds: ResearchJourneyStageId[];
  blockedStageIds: ResearchJourneyStageId[];
  totalStages: number;
  completedStages: number;
  percentComplete: number;
  canMovePrevious: boolean;
  canMoveNext: boolean;
  stageCompletions: JourneyStageCompletion[];
}

/** Structural answer policy: at least one matching answer with non-whitespace text. */
export function hasSatisfiedRequiredAnswer(session: ResearchSession, questionId: string): boolean {
  return session.answers.some(
    (answer) => answer.questionId === questionId && answer.text.trim().length > 0,
  );
}

export function hasValidJourneyDecision(session: ResearchSession, blueprint: Blueprint): boolean {
  const decision = session.decision;
  if (!decision) return false;
  if (decision.justification.trim().length === 0) return false;
  if (typeof decision.confidence !== "number" || !Number.isFinite(decision.confidence)) {
    return false;
  }
  if (decision.confidence < 0 || decision.confidence > 100) return false;
  return blueprint.alternatives.some((alternative) => alternative.id === decision.alternativeId);
}

export function evaluateJourneyStageCompletion(
  stage: ResearchJourneyStage,
  session: ResearchSession,
  blueprint: Blueprint,
): JourneyStageCompletion {
  const missingRequiredQuestionIds = stage.requiredQuestionIds.filter(
    (questionId) => !hasSatisfiedRequiredAnswer(session, questionId),
  );
  const blockingReasons: string[] = [];

  if (missingRequiredQuestionIds.length > 0) {
    blockingReasons.push("Complete the required prompts for this stage.");
  }

  if (stage.id === "CONTEXT" && session.initialIdea.trim().length === 0) {
    blockingReasons.push("Record an initial research idea before leaving Context.");
  }

  if (stage.id === "DECISION") {
    if (!session.decision) {
      blockingReasons.push("Select a research direction before continuing.");
    } else if (!blueprint.alternatives.some((a) => a.id === session.decision?.alternativeId)) {
      blockingReasons.push("The saved decision does not match a valid Blueprint alternative.");
    } else if (session.decision.justification.trim().length === 0) {
      blockingReasons.push("Provide a justification for your selected direction.");
    } else if (
      typeof session.decision.confidence !== "number" ||
      !Number.isFinite(session.decision.confidence) ||
      session.decision.confidence < 0 ||
      session.decision.confidence > 100
    ) {
      blockingReasons.push("Record a valid confidence value between 0 and 100.");
    }
  }

  if (stage.id === "REVIEW") {
    for (const priorId of RESEARCH_JOURNEY_STAGE_IDS) {
      if (priorId === "REVIEW") continue;
      const prior = blueprint.journeyStages.find((item) => item.id === priorId);
      if (!prior) continue;
      const priorCompletion = evaluateJourneyStageCompletion(prior, session, blueprint);
      if (!priorCompletion.complete) {
        blockingReasons.push(`Complete ${prior.title} before finishing the journey.`);
      }
    }
  }

  return {
    stageId: stage.id,
    complete: blockingReasons.length === 0,
    missingRequiredQuestionIds,
    blockingReasons,
  };
}

export function deriveResearchJourneyProgress(
  session: ResearchSession,
  blueprint: Blueprint,
): ResearchJourneyProgress {
  const stages = blueprint.journeyStages;
  const stageCompletions = stages.map((stage) =>
    evaluateJourneyStageCompletion(stage, session, blueprint),
  );

  const completedStageIds = stageCompletions
    .filter((completion) => completion.complete)
    .map((completion) => completion.stageId);

  let currentStageId: ResearchJourneyStageId = RESEARCH_JOURNEY_STAGE_IDS[0]!;
  for (const stageId of RESEARCH_JOURNEY_STAGE_IDS) {
    const completion = stageCompletions.find((item) => item.stageId === stageId);
    if (!completion?.complete) {
      currentStageId = stageId;
      break;
    }
    currentStageId = stageId;
  }

  const currentIndex = RESEARCH_JOURNEY_STAGE_IDS.indexOf(currentStageId);
  const availableStageIds = RESEARCH_JOURNEY_STAGE_IDS.filter(
    (_id, index) => index <= currentIndex,
  );
  const blockedStageIds = RESEARCH_JOURNEY_STAGE_IDS.filter((_id, index) => index > currentIndex);

  const totalStages = RESEARCH_JOURNEY_STAGE_IDS.length;
  const completedStages = completedStageIds.length;
  const percentComplete = Math.round((completedStages / totalStages) * 100);

  const currentComplete =
    stageCompletions.find((item) => item.stageId === currentStageId)?.complete ?? false;

  return {
    currentStageId,
    completedStageIds,
    availableStageIds: [...availableStageIds],
    blockedStageIds: [...blockedStageIds],
    totalStages,
    completedStages,
    percentComplete,
    canMovePrevious: currentIndex > 0,
    canMoveNext: currentComplete && currentIndex < RESEARCH_JOURNEY_STAGE_IDS.length - 1,
    stageCompletions,
  };
}

export function getJourneyStage(
  blueprint: Blueprint,
  stageId: ResearchJourneyStageId,
): ResearchJourneyStage {
  const stage = blueprint.journeyStages.find((item) => item.id === stageId);
  if (!stage) {
    throw new Error(`Journey stage not found: ${stageId}`);
  }
  return stage;
}

export function isJourneyStageAvailable(
  progress: ResearchJourneyProgress,
  stageId: ResearchJourneyStageId,
): boolean {
  return progress.availableStageIds.includes(stageId);
}

export function formatJourneyProgressLabel(
  progress: ResearchJourneyProgress,
  viewedStageId?: ResearchJourneyStageId,
): string {
  const stageId = viewedStageId ?? progress.currentStageId;
  const position = RESEARCH_JOURNEY_STAGE_IDS.indexOf(stageId) + 1;
  return `Stage ${position} of ${progress.totalStages}`;
}

export function adjacentJourneyStageId(
  stageId: ResearchJourneyStageId,
  direction: "previous" | "next",
): ResearchJourneyStageId | undefined {
  const index = RESEARCH_JOURNEY_STAGE_IDS.indexOf(stageId);
  if (index < 0) return undefined;
  const nextIndex = direction === "previous" ? index - 1 : index + 1;
  return RESEARCH_JOURNEY_STAGE_IDS[nextIndex];
}
