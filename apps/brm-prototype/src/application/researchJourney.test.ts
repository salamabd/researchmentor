import { describe, expect, it } from "vitest";
import { bp001 } from "../blueprints/BP-001/blueprint";
import { createNewSession, withDecision } from "../domain/session";
import type { ResearchSession } from "../domain/types";
import {
  deriveResearchJourneyProgress,
  evaluateJourneyStageCompletion,
  formatJourneyProgressLabel,
  getJourneyStage,
} from "./researchJourney";

const NOW = "2026-07-19T10:00:00.000Z";

function answer(session: ResearchSession, questionId: string, text: string): ResearchSession {
  return {
    ...session,
    answers: [...session.answers.filter((a) => a.questionId !== questionId), { questionId, text }],
  };
}

function fillThrough(session: ResearchSession, upToExclusive: string): ResearchSession {
  let next = session;
  const stageOrder = bp001.journeyStages.map((s) => s.id);
  for (const stageId of stageOrder) {
    if (stageId === upToExclusive) break;
    const stage = getJourneyStage(bp001, stageId);
    if (stageId === "ORIENTATION") {
      next = answer(next, "ORIENTATION_ACK", "I understand and am ready to begin.");
    }
    if (stageId === "CONTEXT") {
      next = { ...next, initialIdea: "Staff retention in retail operations" };
      next = answer(next, "Q1", "Observed turnover in stores");
      next = answer(next, "Q3", "Store managers and experienced staff");
    }
    if (stageId === "PROBLEM_FORMULATION") {
      next = answer(next, "Q2", "Why experienced staff leave small retail firms");
      next = answer(next, "Q4", "Exit interviews mention workload");
    }
    if (stageId === "CONSTRAINT_DISCOVERY") {
      next = answer(next, "Q5", "National labour market policy");
      next = answer(next, "Q6", "Access and time");
      next = answer(next, "Q7", "Managers in three stores");
      next = answer(next, "Q8", "That pay is the main driver");
    }
    if (stageId === "ALTERNATIVE_EXAMINATION") {
      next = answer(next, "Q9", "Understanding local retention drivers");
      next = answer(next, "Q15", "Access vs breadth is the main trade-off");
    }
    if (stageId === "DECISION") {
      next = withDecision(
        next,
        {
          alternativeId: "A",
          justification: "Best fit given access to one organisation",
          confidence: 70,
        },
        NOW,
      );
    }
    if (stageId === "REFLECTION") {
      next = answer(next, "Q10", "I narrowed from industry to organisation");
      next = answer(next, "Q11", "Access constraints");
      next = answer(next, "Q12", "Whether findings transfer");
      next = answer(next, "Q13", "More exit-interview detail");
      next = answer(next, "Q14", "Design interview protocol");
    }
  }
  return next;
}

describe("researchJourney evaluators", () => {
  it("starts a new session at Orientation with zero progress", () => {
    const session = createNewSession(NOW, "new");
    const progress = deriveResearchJourneyProgress(session, bp001);
    expect(progress.currentStageId).toBe("ORIENTATION");
    expect(progress.completedStages).toBe(0);
    expect(progress.percentComplete).toBe(0);
    expect(progress.blockedStageIds).toContain("REVIEW");
  });

  it("completes Orientation when the acknowledgement answer is present", () => {
    let session = createNewSession(NOW, "orient");
    const stage = getJourneyStage(bp001, "ORIENTATION");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    session = answer(session, "ORIENTATION_ACK", "Ready");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
    expect(stage.learningObjectives?.length).toBe(7);
  });

  it("treats partial Context as incomplete and completed Context as complete", () => {
    let session = fillThrough(createNewSession(NOW, "ctx"), "CONTEXT");
    const stage = getJourneyStage(bp001, "CONTEXT");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    session = { ...session, initialIdea: "An idea" };
    session = answer(session, "Q1", "Motivation");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    session = answer(session, "Q3", "Stakeholders");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
  });

  it("evaluates Problem Formulation completion", () => {
    let session = fillThrough(createNewSession(NOW, "pf"), "PROBLEM_FORMULATION");
    const stage = getJourneyStage(bp001, "PROBLEM_FORMULATION");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    session = answer(session, "Q2", "Problem");
    session = answer(session, "Q4", "Evidence");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
  });

  it("evaluates Constraint Discovery completion", () => {
    let session = fillThrough(createNewSession(NOW, "cd"), "CONSTRAINT_DISCOVERY");
    const stage = getJourneyStage(bp001, "CONSTRAINT_DISCOVERY");
    session = answer(session, "Q5", "a");
    session = answer(session, "Q6", "b");
    session = answer(session, "Q7", "c");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    session = answer(session, "Q8", "d");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
  });

  it("requires Q9 and Q15 for Alternative Examination", () => {
    let session = fillThrough(createNewSession(NOW, "alt"), "ALTERNATIVE_EXAMINATION");
    const stage = getJourneyStage(bp001, "ALTERNATIVE_EXAMINATION");
    session = answer(session, "Q9", "Contribution");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    session = answer(session, "Q15", "Trade-offs compared");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
  });

  it("requires a valid decision and rejects a missing or invalid stored decision", () => {
    let session = fillThrough(createNewSession(NOW, "dec"), "DECISION");
    const stage = getJourneyStage(bp001, "DECISION");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    session = withDecision(
      session,
      { alternativeId: "Z", justification: "Bad", confidence: 50 },
      NOW,
    );
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    session = withDecision(
      session,
      { alternativeId: "A", justification: "Good fit", confidence: 60 },
      NOW,
    );
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
  });

  it("requires all reflection prompts including Q10–Q14", () => {
    let session = fillThrough(createNewSession(NOW, "ref"), "REFLECTION");
    const stage = getJourneyStage(bp001, "REFLECTION");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
    for (const id of ["Q10", "Q11", "Q12", "Q13", "Q14"]) {
      session = answer(session, id, `Response for ${id}`);
    }
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
  });

  it("marks Review complete only when the full journey is structurally complete", () => {
    const incomplete = fillThrough(createNewSession(NOW, "rev-partial"), "REFLECTION");
    const review = getJourneyStage(bp001, "REVIEW");
    expect(evaluateJourneyStageCompletion(review, incomplete, bp001).complete).toBe(false);
    const complete = fillThrough(createNewSession(NOW, "rev-full"), "REVIEW");
    expect(evaluateJourneyStageCompletion(review, complete, bp001).complete).toBe(true);
    const progress = deriveResearchJourneyProgress(complete, bp001);
    expect(progress.currentStageId).toBe("REVIEW");
    expect(progress.percentComplete).toBe(100);
    expect(formatJourneyProgressLabel(progress)).toBe("Stage 8 of 8");
  });

  it("does not mutate session or blueprint inputs", () => {
    const session = createNewSession(NOW, "immut");
    const beforeSession = JSON.stringify(session);
    const beforeBlueprint = JSON.stringify(bp001);
    deriveResearchJourneyProgress(session, bp001);
    expect(JSON.stringify(session)).toBe(beforeSession);
    expect(JSON.stringify(bp001)).toBe(beforeBlueprint);
  });

  it("treats whitespace-only answers as incomplete", () => {
    let session = fillThrough(createNewSession(NOW, "ws"), "CONTEXT");
    session = { ...session, initialIdea: "Idea" };
    session = answer(session, "Q1", "   ");
    session = answer(session, "Q3", "Stakeholders");
    const stage = getJourneyStage(bp001, "CONTEXT");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(false);
  });

  it("accepts a required question when at least one duplicate answer has non-whitespace text", () => {
    let session = fillThrough(createNewSession(NOW, "dup"), "CONTEXT");
    session = { ...session, initialIdea: "Idea" };
    session = {
      ...session,
      answers: [
        { questionId: "Q1", text: "   " },
        { questionId: "Q1", text: "Valid motivation" },
        { questionId: "Q3", text: "Stakeholders" },
      ],
    };
    const stage = getJourneyStage(bp001, "CONTEXT");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
    expect(session.answers).toHaveLength(3);
  });

  it("ignores unknown answers for completion while preserving them", () => {
    let session = fillThrough(createNewSession(NOW, "unk"), "CONTEXT");
    session = { ...session, initialIdea: "Idea" };
    session = answer(session, "Q1", "Motivation");
    session = answer(session, "Q3", "Stakeholders");
    session = {
      ...session,
      answers: [...session.answers, { questionId: "Q99", text: "Orphan" }],
    };
    const stage = getJourneyStage(bp001, "CONTEXT");
    expect(evaluateJourneyStageCompletion(stage, session, bp001).complete).toBe(true);
    expect(session.answers.some((a) => a.questionId === "Q99")).toBe(true);
  });

  it("preserves later work when earlier answers are edited", () => {
    let session = fillThrough(createNewSession(NOW, "edit"), "REVIEW");
    expect(session.decision?.alternativeId).toBe("A");
    session = answer(session, "Q1", "Revised motivation");
    expect(session.decision?.alternativeId).toBe("A");
    expect(session.answers.find((a) => a.questionId === "Q14")?.text).toBeTruthy();
    expect(deriveResearchJourneyProgress(session, bp001).completedStages).toBe(8);
  });
});
