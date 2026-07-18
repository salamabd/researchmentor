import type { Blueprint, Alternative } from "../../domain/types";
export const bp001: Blueprint = {
  id: "BP-001",
  title: "Choosing a Research Topic",
  questions: [
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
  ],
};
export const mockAlternatives: Alternative[] = [
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
];
