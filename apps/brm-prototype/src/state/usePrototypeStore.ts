import { create } from "zustand";
import { blueprintRegistry, sessionService } from "../app/composition";
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

function resolveBlueprint(session: ResearchSession): Blueprint {
  return blueprintRegistry.getById(session.blueprintId);
}

function fromSession(session: ResearchSession): Pick<Store, keyof PrototypeState | "status"> {
  return {
    ...toPrototypeState(session),
    status: session.status,
  };
}

const initialSession = sessionService.getSession();

export const usePrototypeStore = create<Store>()((set, get) => ({
  ...fromSession(initialSession),
  getBlueprint: () => resolveBlueprint(sessionService.getSession()),
  setProfile: (profile) => set(fromSession(sessionService.updateProfile(profile))),
  setInitialIdea: (initialIdea) => set(fromSession(sessionService.updateInitialIdea(initialIdea))),
  saveAnswer: (questionId, text) => set(fromSession(sessionService.saveAnswer(questionId, text))),
  nextQuestion: () => {
    const blueprint = resolveBlueprint(sessionService.getSession());
    set(fromSession(sessionService.goToNextQuestion(blueprint.questions.length)));
  },
  previousQuestion: () => set(fromSession(sessionService.goToPreviousQuestion())),
  setDecision: (decision) => set(fromSession(sessionService.saveDecision(decision))),
  setSupervisorFeedback: (supervisorFeedback) =>
    set(fromSession(sessionService.saveSupervisorFeedback(supervisorFeedback))),
  complete: () => set(fromSession(sessionService.markComplete())),
  reset: () => set(fromSession(sessionService.reset())),
  createDecisionRecord: () => {
    const blueprint = get().getBlueprint();
    return sessionService.createDecisionRecordExport(blueprint.alternatives);
  },
}));
