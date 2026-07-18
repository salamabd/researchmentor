import { describe, expect, it } from "vitest";
import { createDecisionRecord } from "./decisionRecord";
import { createNewSession, markCompleted, withDecision, withInitialIdea } from "./session";
import type { Alternative } from "./types";

const NOW = "2026-07-18T15:00:00.000Z";

const alternatives: Alternative[] = [
  {
    id: "A",
    title: "Narrow organisational case",
    description: "Study one organisation",
    strengths: ["High feasibility"],
    risks: ["Limited generalisability"],
  },
];

describe("Decision Record", () => {
  it("creates BUILD-001 compatible export data", () => {
    let session = createNewSession(NOW, "rec-1");
    session = withInitialIdea(session, "Staff retention in retail", NOW);
    session = withDecision(
      session,
      {
        alternativeId: "A",
        justification: "Best fit given access and scope constraints for this study",
        confidence: 80,
      },
      NOW,
    );
    session = markCompleted(session, NOW);

    const record = createDecisionRecord(session, alternatives, "2026-07-18T16:00:00.000Z");
    expect(record).toEqual({
      blueprint: "BP-001",
      profile: session.profile,
      initialIdea: "Staff retention in retail",
      answers: [],
      decision: {
        alternativeId: "A",
        justification: "Best fit given access and scope constraints for this study",
        confidence: 80,
      },
      selectedDirection: alternatives[0],
      supervisorFeedback: "",
      completed: true,
      exportedAt: "2026-07-18T16:00:00.000Z",
    });
  });
});
