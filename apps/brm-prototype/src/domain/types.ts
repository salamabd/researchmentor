export type DegreeLevel = "MBA" | "MSc" | "DBA" | "PhD" | "Other";

export type ResearchExperience = "none" | "limited" | "moderate" | "experienced";

export type ResearchSessionStatus = "not_started" | "in_progress" | "completed";

export interface StudentProfile {
  degreeLevel: DegreeLevel;
  discipline: string;
  researchExperience: ResearchExperience;
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

/** Presentation projection of working session fields (BUILD-001 compatible). */
export interface PrototypeState {
  blueprintId: string;
  profile: StudentProfile;
  initialIdea: string;
  answers: Answer[];
  currentQuestionIndex: number;
  decision?: Decision;
  supervisorFeedback: string;
  completed: boolean;
}

export type BlueprintPurpose = "decision" | "reflection" | "evaluation" | "planning" | "mentoring";

export interface BlueprintQuestion {
  id: string;
  stage: string;
  text: string;
  rationale: string;
}

export interface Blueprint {
  id: string;
  version: string;
  purpose: BlueprintPurpose;
  title: string;
  questions: BlueprintQuestion[];
  alternatives: Alternative[];
}

export interface ResearchSession {
  id: string;
  blueprintId: string;
  status: ResearchSessionStatus;
  profile: StudentProfile;
  initialIdea: string;
  answers: Answer[];
  currentQuestionIndex: number;
  decision?: Decision;
  supervisorFeedback: string;
  completed: boolean;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}

/** BUILD-001 Decision Record export shape (field names preserved). */
export interface DecisionRecord {
  blueprint: string;
  profile: StudentProfile;
  initialIdea: string;
  answers: Answer[];
  decision?: Decision;
  selectedDirection?: Alternative;
  supervisorFeedback: string;
  completed: boolean;
  exportedAt: string;
}
