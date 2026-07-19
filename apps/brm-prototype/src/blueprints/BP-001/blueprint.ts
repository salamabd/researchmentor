import type { Alternative, Blueprint } from "../../domain/types";

/** Authoritative BP-001 Blueprint definition (BUILD-001 Q1–Q10 preserved; BUILD-006 adds journey + Q11–Q15). */
export const bp001: Blueprint = {
  id: "BP-001",
  version: "1.0.0",
  purpose: "decision",
  title: "Choosing a Research Topic",
  questions: [
    {
      id: "ORIENTATION_ACK",
      stage: "Orientation",
      text: "I understand that BRM guides my thinking, that my wording remains my own, and that I am ready to begin this research decision journey.",
      rationale:
        "Orientation confirms informed consent to a guided thinking process rather than automated writing.",
    },
    {
      id: "Q1",
      stage: "Motivation",
      text: "What made you interested in this issue?",
      rationale:
        "Motivation reveals whether the idea is grounded in experience, curiosity, or an observed problem.",
    },
    {
      id: "Q2",
      stage: "Business problem",
      text: "What specific business problem are you trying to understand?",
      rationale:
        "A researchable topic begins with a clear problem, not only a broad area of interest.",
    },
    {
      id: "Q3",
      stage: "Stakeholders",
      text: "Who experiences this problem most directly?",
      rationale: "Identifying stakeholders helps define the context and unit of analysis.",
    },
    {
      id: "Q4",
      stage: "Evidence",
      text: "What evidence suggests the problem actually exists?",
      rationale: "Evidence separates an assumption from a defensible research concern.",
    },
    {
      id: "Q5",
      stage: "Scope",
      text: "What part of the problem is outside your intended study?",
      rationale: "Explicit boundaries protect feasibility and clarity.",
    },
    {
      id: "Q6",
      stage: "Constraints",
      text: "What two constraints are most likely to shape this study?",
      rationale:
        "Time, access, ethics, data, and method constraints influence what is realistically researchable.",
    },
    {
      id: "Q7",
      stage: "Data feasibility",
      text: "What data or participants could you realistically access?",
      rationale: "A promising topic must also be feasible.",
    },
    {
      id: "Q8",
      stage: "Assumptions",
      text: "Which assumption in your current idea are you least certain about?",
      rationale: "Recognising uncertainty is a core research skill.",
    },
    {
      id: "Q9",
      stage: "Contribution",
      text: "What useful understanding could this research produce?",
      rationale: "A topic should point toward a meaningful contribution.",
    },
    {
      id: "Q10",
      stage: "Reflection",
      text: "What has changed in your thinking since you began?",
      rationale: "Reflection makes the learning visible.",
    },
    {
      id: "Q11",
      stage: "Reflection",
      text: "What most influenced your decision?",
      rationale: "Identifying influence clarifies how evidence and constraints shaped the choice.",
    },
    {
      id: "Q12",
      stage: "Reflection",
      text: "What remains uncertain about your selected direction?",
      rationale: "Making uncertainty explicit protects later research design.",
    },
    {
      id: "Q13",
      stage: "Reflection",
      text: "What evidence do you still need?",
      rationale: "Naming missing evidence connects the decision to the next research steps.",
    },
    {
      id: "Q14",
      stage: "Reflection",
      text: "What is your next research action or question?",
      rationale: "A concrete next step turns the decision into a research plan.",
    },
    {
      id: "Q15",
      stage: "Alternatives",
      text: "Having compared the three directions, which trade-offs matter most for your study and why?",
      rationale:
        "Explicit comparison prevents premature commitment and surfaces feasibility trade-offs.",
    },
  ],
  alternatives: [
    {
      id: "A",
      title: "Narrow organisational case",
      description: "Study the issue within one accessible organisation or business unit.",
      strengths: ["High feasibility", "Clear context"],
      risks: ["Limited generalisability", "Access dependency"],
    },
    {
      id: "B",
      title: "Cross-sectional industry study",
      description: "Compare the issue across several organisations in one industry.",
      strengths: ["Broader relevance", "Comparative insight"],
      risks: ["Harder recruitment", "More complex data"],
    },
    {
      id: "C",
      title: "Focused stakeholder study",
      description: "Concentrate on one stakeholder group and one clearly defined outcome.",
      strengths: ["Strong scope control", "Clear analytical focus"],
      risks: ["May overlook wider context", "Requires precise stakeholder definition"],
    },
  ],
  journeyStages: [
    {
      id: "ORIENTATION",
      title: "Orientation",
      purpose:
        "Explain the research decision, how BRM guides thinking without writing your work, and what you should be able to do by the end of the journey.",
      learningObjectives: [
        "Explain the research decision being made.",
        "Distinguish a broad topic from a researchable business problem.",
        "Identify important constraints.",
        "Compare viable alternatives.",
        "Justify a selected direction.",
        "Recognise remaining uncertainty.",
        "Identify the next research action.",
      ],
      questionIds: ["ORIENTATION_ACK"],
      requiredQuestionIds: ["ORIENTATION_ACK"],
    },
    {
      id: "CONTEXT",
      title: "Context",
      purpose:
        "Capture your initial research interest, discipline context, and the stakeholders who experience the issue.",
      questionIds: ["Q1", "Q3"],
      requiredQuestionIds: ["Q1", "Q3"],
    },
    {
      id: "PROBLEM_FORMULATION",
      title: "Problem formulation",
      purpose:
        "Move from a broad topic or interest toward a researchable business problem supported by evidence, without BRM writing the problem for you.",
      questionIds: ["Q2", "Q4"],
      requiredQuestionIds: ["Q2", "Q4"],
    },
    {
      id: "CONSTRAINT_DISCOVERY",
      title: "Constraint discovery",
      purpose:
        "Identify scope boundaries, practical constraints, data access, and uncertain assumptions that shape what is researchable.",
      questionIds: ["Q5", "Q6", "Q7", "Q8"],
      requiredQuestionIds: ["Q5", "Q6", "Q7", "Q8"],
    },
    {
      id: "ALTERNATIVE_EXAMINATION",
      title: "Alternative examination",
      purpose:
        "Compare validated topic directions and make trade-offs explicit before committing to one option.",
      questionIds: ["Q9", "Q15"],
      requiredQuestionIds: ["Q9", "Q15"],
    },
    {
      id: "DECISION",
      title: "Decision",
      purpose:
        "Select one valid research direction, justify it in your own words, and record confidence.",
      questionIds: [],
      requiredQuestionIds: [],
    },
    {
      id: "REFLECTION",
      title: "Reflection",
      purpose:
        "Make uncertainty visible, identify what influenced the decision, and state the next research action.",
      questionIds: ["Q10", "Q11", "Q12", "Q13", "Q14"],
      requiredQuestionIds: ["Q10", "Q11", "Q12", "Q13", "Q14"],
    },
    {
      id: "REVIEW",
      title: "Review",
      purpose:
        "Review the complete reasoning journey and export a Decision Record that captures your reasoning without certifying correctness.",
      questionIds: [],
      requiredQuestionIds: [],
    },
  ],
};

/** Compatibility alias — same array as `bp001.alternatives`. */
export const mockAlternatives: Alternative[] = bp001.alternatives;
