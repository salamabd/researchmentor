import type { Alternative, DecisionRecord, ResearchSession } from "./types";

export function createDecisionRecord(
  session: ResearchSession,
  alternatives: Alternative[],
  exportedAt: string,
): DecisionRecord {
  const selectedDirection = alternatives.find((a) => a.id === session.decision?.alternativeId);
  return {
    blueprint: session.blueprintId,
    profile: session.profile,
    initialIdea: session.initialIdea,
    answers: session.answers,
    decision: session.decision,
    selectedDirection,
    supervisorFeedback: session.supervisorFeedback,
    completed: session.completed,
    exportedAt,
  };
}
