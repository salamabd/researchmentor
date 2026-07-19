import { create } from "zustand";
import { blueprintExecutionService, sessionService } from "../app/composition";
import { toPrototypeState } from "../domain/session";
import type {
  Blueprint,
  Decision,
  DecisionRecord,
  PrototypeState,
  ResearchJourneyStage,
  ResearchJourneyStageId,
  ResearchSession,
  StudentProfile,
} from "../domain/types";
import type { SessionDiagnosticsReport } from "../application/sessionDiagnostics";
import type { ResearchJourneyProgress } from "../application/researchJourney";

interface Store extends PrototypeState {
  status: ResearchSession["status"];
  getBlueprint: () => Blueprint;
  getSessionDiagnostics: () => SessionDiagnosticsReport;
  getResearchJourneyProgress: () => ResearchJourneyProgress;
  getResearchJourneyStage: (stageId: ResearchJourneyStageId) => ResearchJourneyStage;
  assertResearchJourneyStageAvailable: (stageId: ResearchJourneyStageId) => ResearchJourneyProgress;
  completeResearchJourney: () => ResearchSession;
  setProfile: (p: StudentProfile) => void;
  setInitialIdea: (v: string) => void;
  saveAnswer: (questionId: string, text: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setDecision: (d: Decision) => void;
  setSupervisorFeedback: (v: string) => void;
  reset: () => void;
  createDecisionRecord: () => DecisionRecord;
}

function fromSession(session: ResearchSession): Pick<Store, keyof PrototypeState | "status"> {
  return {
    ...toPrototypeState(session),
    status: session.status,
  };
}

const initialSession = sessionService.getSession();

export const usePrototypeStore = create<Store>()((set) => ({
  ...fromSession(initialSession),
  getBlueprint: () => blueprintExecutionService.getActiveBlueprint(),
  getSessionDiagnostics: () => blueprintExecutionService.getSessionDiagnostics(),
  getResearchJourneyProgress: () => blueprintExecutionService.getResearchJourneyProgress(),
  getResearchJourneyStage: (stageId) => blueprintExecutionService.getResearchJourneyStage(stageId),
  assertResearchJourneyStageAvailable: (stageId) =>
    blueprintExecutionService.assertResearchJourneyStageAvailable(stageId),
  completeResearchJourney: () => {
    const session = blueprintExecutionService.completeResearchJourney();
    set(fromSession(session));
    return session;
  },
  setProfile: (profile) => set(fromSession(sessionService.updateProfile(profile))),
  setInitialIdea: (initialIdea) => set(fromSession(sessionService.updateInitialIdea(initialIdea))),
  saveAnswer: (questionId, text) => set(fromSession(sessionService.saveAnswer(questionId, text))),
  nextQuestion: () => set(fromSession(blueprintExecutionService.goToNextQuestion())),
  previousQuestion: () => set(fromSession(blueprintExecutionService.goToPreviousQuestion())),
  setDecision: (decision) => set(fromSession(blueprintExecutionService.saveDecision(decision))),
  setSupervisorFeedback: (supervisorFeedback) =>
    set(fromSession(sessionService.saveSupervisorFeedback(supervisorFeedback))),
  reset: () => set(fromSession(sessionService.reset())),
  createDecisionRecord: () => blueprintExecutionService.createDecisionRecord(),
}));
