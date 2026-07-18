import type {
  Answer,
  Decision,
  ResearchSession,
  ResearchSessionStatus,
  StudentProfile,
} from "./types";

export const BP001_ID = "BP-001";

export const emptyProfile: StudentProfile = {
  degreeLevel: "MBA",
  discipline: "Management",
  researchExperience: "limited",
  professionalContext: "",
};

export function createNewSession(nowIso: string, id: string): ResearchSession {
  return {
    id,
    blueprintId: BP001_ID,
    status: "not_started",
    profile: { ...emptyProfile },
    initialIdea: "",
    answers: [],
    currentQuestionIndex: 0,
    supervisorFeedback: "",
    completed: false,
    startedAt: nowIso,
    updatedAt: nowIso,
  };
}

export function hasMeaningfulProgress(session: ResearchSession): boolean {
  if (session.completed) return true;
  if (session.initialIdea.trim().length > 0) return true;
  if (session.answers.some((a) => a.text.trim().length > 0)) return true;
  if (session.currentQuestionIndex > 0) return true;
  if (session.decision) return true;
  if (session.supervisorFeedback.trim().length > 0) return true;
  if (session.profile.professionalContext.trim().length > 0) return true;
  if (session.profile.degreeLevel !== emptyProfile.degreeLevel) return true;
  if (session.profile.discipline !== emptyProfile.discipline) return true;
  if (session.profile.researchExperience !== emptyProfile.researchExperience) return true;
  return false;
}

export function determineSessionStatus(session: ResearchSession): ResearchSessionStatus {
  if (session.completed) return "completed";
  if (hasMeaningfulProgress(session)) return "in_progress";
  return "not_started";
}

function withStatus(session: ResearchSession, nowIso: string): ResearchSession {
  const status = determineSessionStatus(session);
  const next: ResearchSession = {
    ...session,
    status,
    updatedAt: nowIso,
  };
  if (status === "completed") {
    return {
      ...next,
      completed: true,
      completedAt: session.completedAt ?? nowIso,
    };
  }
  return {
    ...next,
    completed: false,
    completedAt: undefined,
  };
}

export function withProfile(
  session: ResearchSession,
  profile: StudentProfile,
  nowIso: string,
): ResearchSession {
  return withStatus({ ...session, profile: { ...profile } }, nowIso);
}

export function withInitialIdea(
  session: ResearchSession,
  initialIdea: string,
  nowIso: string,
): ResearchSession {
  return withStatus({ ...session, initialIdea }, nowIso);
}

export function upsertAnswer(
  session: ResearchSession,
  questionId: string,
  text: string,
  nowIso: string,
): ResearchSession {
  const answers: Answer[] = [
    ...session.answers.filter((a) => a.questionId !== questionId),
    { questionId, text },
  ];
  return withStatus({ ...session, answers }, nowIso);
}

export function withQuestionIndex(
  session: ResearchSession,
  index: number,
  questionCount: number,
  nowIso: string,
): ResearchSession {
  const maxIndex = Math.max(0, questionCount - 1);
  const currentQuestionIndex = Math.min(Math.max(0, index), maxIndex);
  return withStatus({ ...session, currentQuestionIndex }, nowIso);
}

export function nextQuestionIndex(
  session: ResearchSession,
  questionCount: number,
  nowIso: string,
): ResearchSession {
  return withQuestionIndex(session, session.currentQuestionIndex + 1, questionCount, nowIso);
}

export function previousQuestionIndex(session: ResearchSession, nowIso: string): ResearchSession {
  const currentQuestionIndex = Math.max(0, session.currentQuestionIndex - 1);
  return withStatus({ ...session, currentQuestionIndex }, nowIso);
}

export function withDecision(
  session: ResearchSession,
  decision: Decision,
  nowIso: string,
): ResearchSession {
  return withStatus({ ...session, decision: { ...decision } }, nowIso);
}

export function withSupervisorFeedback(
  session: ResearchSession,
  supervisorFeedback: string,
  nowIso: string,
): ResearchSession {
  return withStatus({ ...session, supervisorFeedback }, nowIso);
}

export function markCompleted(session: ResearchSession, nowIso: string): ResearchSession {
  return withStatus(
    {
      ...session,
      completed: true,
      completedAt: nowIso,
    },
    nowIso,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function parseProfile(value: unknown): StudentProfile {
  if (!isRecord(value)) return { ...emptyProfile };
  const degreeLevel = asString(value.degreeLevel, emptyProfile.degreeLevel);
  const researchExperience = asString(value.researchExperience, emptyProfile.researchExperience);
  return {
    degreeLevel: (["MBA", "MSc", "DBA", "PhD", "Other"] as const).includes(
      degreeLevel as StudentProfile["degreeLevel"],
    )
      ? (degreeLevel as StudentProfile["degreeLevel"])
      : emptyProfile.degreeLevel,
    discipline: asString(value.discipline, emptyProfile.discipline),
    researchExperience: (["none", "limited", "moderate", "experienced"] as const).includes(
      researchExperience as StudentProfile["researchExperience"],
    )
      ? (researchExperience as StudentProfile["researchExperience"])
      : emptyProfile.researchExperience,
    professionalContext: asString(value.professionalContext, ""),
  };
}

function parseAnswers(value: unknown): Answer[] {
  if (!Array.isArray(value)) return [];
  const answers: Answer[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const questionId = asString(item.questionId);
    if (!questionId) continue;
    answers.push({ questionId, text: asString(item.text) });
  }
  return answers;
}

function parseDecision(value: unknown): Decision | undefined {
  if (!isRecord(value)) return undefined;
  const alternativeId = asString(value.alternativeId);
  if (!alternativeId) return undefined;
  return {
    alternativeId,
    justification: asString(value.justification),
    confidence: asNumber(value.confidence, 60),
  };
}

/**
 * Normalise unknown stored JSON into a ResearchSession.
 * Returns null when the payload is unusable.
 */
export function normaliseLoadedSession(
  raw: unknown,
  nowIso: string,
  fallbackId: string,
): ResearchSession | null {
  if (!isRecord(raw)) return null;

  // Zustand persist envelope: { state: {...}, version?: number }
  const source = isRecord(raw.state) ? raw.state : raw;

  // Must look like a session/prototype state (at least one known working field).
  const looksLikeSession =
    "profile" in source ||
    "initialIdea" in source ||
    "answers" in source ||
    "currentQuestionIndex" in source ||
    "supervisorFeedback" in source ||
    "completed" in source;
  if (!looksLikeSession) return null;

  const base = createNewSession(nowIso, asString(source.id, fallbackId));
  const completed = asBoolean(source.completed, false);
  const session: ResearchSession = {
    ...base,
    id: asString(source.id, fallbackId),
    blueprintId: asString(source.blueprintId, BP001_ID) || BP001_ID,
    profile: parseProfile(source.profile),
    initialIdea: asString(source.initialIdea),
    answers: parseAnswers(source.answers),
    currentQuestionIndex: Math.max(0, asNumber(source.currentQuestionIndex, 0)),
    decision: parseDecision(source.decision),
    supervisorFeedback: asString(source.supervisorFeedback),
    completed,
    startedAt: asString(source.startedAt, nowIso),
    updatedAt: asString(source.updatedAt, nowIso),
    completedAt: completed ? asString(source.completedAt, nowIso) : undefined,
  };

  return withStatus(session, nowIso);
}

export function toPrototypeState(session: ResearchSession) {
  return {
    blueprintId: session.blueprintId,
    profile: session.profile,
    initialIdea: session.initialIdea,
    answers: session.answers,
    currentQuestionIndex: session.currentQuestionIndex,
    decision: session.decision,
    supervisorFeedback: session.supervisorFeedback,
    completed: session.completed,
  };
}
