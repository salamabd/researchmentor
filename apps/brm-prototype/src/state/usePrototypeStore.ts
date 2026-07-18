import { create } from "zustand";
import { blueprintExecutionService, sessionService } from "../app/composition";
import { toPrototypeState } from "../domain/session";
import type {
  Blueprint,
  Decision,
  DecisionRecord,
  PrototypeState,
  ResearchSession,
  StudentProfile,
} from "../domain/types";

interface Store extends PrototypeState {
  status: ResearchSession["status"];
  getBlueprint: () => Blueprint;
  setProfile: (p: StudentProfile) => void;
  setInitialIdea: (v: string) => void;
  saveAnswer: (questionId: string, text: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setDecision: (d: Decision) => void;
  setSupervisorFeedback: (v: string) => void;
  complete: () => void;
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
  setProfile: (profile) => set(fromSession(sessionService.updateProfile(profile))),
  setInitialIdea: (initialIdea) => set(fromSession(sessionService.updateInitialIdea(initialIdea))),
  saveAnswer: (questionId, text) => set(fromSession(sessionService.saveAnswer(questionId, text))),
  nextQuestion: () => set(fromSession(blueprintExecutionService.goToNextQuestion())),
  previousQuestion: () => set(fromSession(blueprintExecutionService.goToPreviousQuestion())),
  setDecision: (decision) => set(fromSession(blueprintExecutionService.saveDecision(decision))),
  setSupervisorFeedback: (supervisorFeedback) =>
    set(fromSession(sessionService.saveSupervisorFeedback(supervisorFeedback))),
  complete: () => set(fromSession(sessionService.markComplete())),
  reset: () => set(fromSession(sessionService.reset())),
  createDecisionRecord: () => blueprintExecutionService.createDecisionRecord(),
}));
