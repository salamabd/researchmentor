import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PrototypeState, StudentProfile, Decision } from "../domain/types";
const emptyProfile: StudentProfile = {
  degreeLevel: "MBA",
  discipline: "Management",
  researchExperience: "limited",
  professionalContext: "",
};
interface Store extends PrototypeState {
  setProfile: (p: StudentProfile) => void;
  setInitialIdea: (v: string) => void;
  saveAnswer: (questionId: string, text: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setDecision: (d: Decision) => void;
  setSupervisorFeedback: (v: string) => void;
  complete: () => void;
  reset: () => void;
}
const initial: PrototypeState = {
  profile: emptyProfile,
  initialIdea: "",
  answers: [],
  currentQuestionIndex: 0,
  supervisorFeedback: "",
  completed: false,
};
export const usePrototypeStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initial,
      setProfile: (profile) => set({ profile }),
      setInitialIdea: (initialIdea) => set({ initialIdea }),
      saveAnswer: (questionId, text) =>
        set({
          answers: [
            ...get().answers.filter((a) => a.questionId !== questionId),
            { questionId, text },
          ],
        }),
      nextQuestion: () => set({ currentQuestionIndex: get().currentQuestionIndex + 1 }),
      previousQuestion: () =>
        set({ currentQuestionIndex: Math.max(0, get().currentQuestionIndex - 1) }),
      setDecision: (decision) => set({ decision }),
      setSupervisorFeedback: (supervisorFeedback) => set({ supervisorFeedback }),
      complete: () => set({ completed: true }),
      reset: () => set(initial),
    }),
    { name: "brm.prototype.v1" },
  ),
);
