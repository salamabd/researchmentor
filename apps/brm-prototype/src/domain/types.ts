export type DegreeLevel = "MBA" | "MSc" | "DBA" | "PhD" | "Other";
export interface StudentProfile {
  degreeLevel: DegreeLevel;
  discipline: string;
  researchExperience: "none" | "limited" | "moderate" | "experienced";
  professionalContext: string;
}
export interface Answer {
  questionId: string;
  text: string;
}
export interface Alternative {
  id: string;
  title: string;
  description: string;
  strengths: string[];
  risks: string[];
}
export interface Decision {
  alternativeId: string;
  justification: string;
  confidence: number;
}
export interface PrototypeState {
  profile: StudentProfile;
  initialIdea: string;
  answers: Answer[];
  currentQuestionIndex: number;
  decision?: Decision;
  supervisorFeedback: string;
  completed: boolean;
}
export interface BlueprintQuestion {
  id: string;
  stage: string;
  text: string;
  rationale: string;
}
export interface Blueprint {
  id: string;
  title: string;
  questions: BlueprintQuestion[];
}
