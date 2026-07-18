import { createDecisionRecord } from "../domain/decisionRecord";
import {
  createNewSession,
  markCompleted,
  nextQuestionIndex,
  previousQuestionIndex,
  toPrototypeState,
  upsertAnswer,
  withDecision,
  withInitialIdea,
  withProfile,
  withSupervisorFeedback,
} from "../domain/session";
import type {
  Alternative,
  Decision,
  DecisionRecord,
  ResearchSession,
  StudentProfile,
} from "../domain/types";
import type { ResearchSessionRepository } from "../persistence/researchSessionRepository";

export interface Clock {
  nowIso(): string;
}

export interface IdGenerator {
  nextId(): string;
}

export interface SessionServiceDeps {
  repository: ResearchSessionRepository;
  clock?: Clock;
  ids?: IdGenerator;
}

const defaultClock: Clock = {
  nowIso: () => new Date().toISOString(),
};

const defaultIds: IdGenerator = {
  nextId: () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `session-${Date.now()}`;
  },
};

export class SessionService {
  private readonly repository: ResearchSessionRepository;
  private readonly clock: Clock;
  private readonly ids: IdGenerator;
  private session: ResearchSession;

  constructor(deps: SessionServiceDeps) {
    this.repository = deps.repository;
    this.clock = deps.clock ?? defaultClock;
    this.ids = deps.ids ?? defaultIds;
    this.session = this.loadOrCreate();
  }

  getSession(): ResearchSession {
    return this.session;
  }

  getPrototypeState() {
    return toPrototypeState(this.session);
  }

  updateProfile(profile: StudentProfile): ResearchSession {
    return this.commit(withProfile(this.session, profile, this.clock.nowIso()));
  }

  updateInitialIdea(idea: string): ResearchSession {
    return this.commit(withInitialIdea(this.session, idea, this.clock.nowIso()));
  }

  saveAnswer(questionId: string, text: string): ResearchSession {
    return this.commit(upsertAnswer(this.session, questionId, text, this.clock.nowIso()));
  }

  goToNextQuestion(questionCount: number): ResearchSession {
    return this.commit(nextQuestionIndex(this.session, questionCount, this.clock.nowIso()));
  }

  goToPreviousQuestion(): ResearchSession {
    return this.commit(previousQuestionIndex(this.session, this.clock.nowIso()));
  }

  saveDecision(decision: Decision): ResearchSession {
    return this.commit(withDecision(this.session, decision, this.clock.nowIso()));
  }

  saveSupervisorFeedback(feedback: string): ResearchSession {
    return this.commit(withSupervisorFeedback(this.session, feedback, this.clock.nowIso()));
  }

  markComplete(): ResearchSession {
    return this.commit(markCompleted(this.session, this.clock.nowIso()));
  }

  reset(): ResearchSession {
    this.repository.clear();
    const created = createNewSession(this.clock.nowIso(), this.ids.nextId());
    return this.commit(created);
  }

  createDecisionRecordExport(alternatives: Alternative[]): DecisionRecord {
    return createDecisionRecord(this.session, alternatives, this.clock.nowIso());
  }

  private loadOrCreate(): ResearchSession {
    const loaded = this.repository.load();
    if (loaded) return loaded;
    const created = createNewSession(this.clock.nowIso(), this.ids.nextId());
    this.repository.save(created);
    return created;
  }

  private commit(session: ResearchSession): ResearchSession {
    this.session = session;
    this.repository.save(session);
    return session;
  }
}

export function createSessionService(deps: SessionServiceDeps): SessionService {
  return new SessionService(deps);
}
