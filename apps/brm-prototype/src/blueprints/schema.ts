import { z } from "zod";
import type { Blueprint, BlueprintPurpose, ResearchJourneyStageId } from "../domain/types";
import { RESEARCH_JOURNEY_STAGE_IDS } from "../domain/types";

const nonEmpty = z.string().trim().min(1);

export const BLUEPRINT_PURPOSES: readonly BlueprintPurpose[] = [
  "decision",
  "reflection",
  "evaluation",
  "planning",
  "mentoring",
] as const;

const blueprintPurposeSchema = z.enum([
  "decision",
  "reflection",
  "evaluation",
  "planning",
  "mentoring",
]);

const journeyStageIdSchema = z.enum([
  "ORIENTATION",
  "CONTEXT",
  "PROBLEM_FORMULATION",
  "CONSTRAINT_DISCOVERY",
  "ALTERNATIVE_EXAMINATION",
  "DECISION",
  "REFLECTION",
  "REVIEW",
]);

const blueprintQuestionSchema = z.object({
  id: nonEmpty,
  stage: nonEmpty,
  text: nonEmpty,
  rationale: nonEmpty,
});

const alternativeSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  description: nonEmpty,
  strengths: z.array(z.string()).min(1),
  risks: z.array(z.string()).min(1),
});

const researchJourneyStageSchema = z.object({
  id: journeyStageIdSchema,
  title: nonEmpty,
  purpose: nonEmpty,
  learningObjectives: z.array(nonEmpty).optional(),
  questionIds: z.array(nonEmpty),
  requiredQuestionIds: z.array(nonEmpty),
});

export const blueprintSchema = z
  .object({
    id: nonEmpty,
    version: nonEmpty,
    purpose: blueprintPurposeSchema,
    title: nonEmpty,
    questions: z.array(blueprintQuestionSchema).min(1),
    alternatives: z.array(alternativeSchema).min(1),
    journeyStages: z.array(researchJourneyStageSchema).min(1),
  })
  .superRefine((value, ctx) => {
    const questionIds = value.questions.map((q) => q.id);
    if (new Set(questionIds).size !== questionIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate question ids are not allowed",
        path: ["questions"],
      });
    }
    const questionIdSet = new Set(questionIds);

    const alternativeIds = value.alternatives.map((a) => a.id);
    if (new Set(alternativeIds).size !== alternativeIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate alternative ids are not allowed",
        path: ["alternatives"],
      });
    }

    const stageIds = value.journeyStages.map((s) => s.id);
    if (new Set(stageIds).size !== stageIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate journey stage ids are not allowed",
        path: ["journeyStages"],
      });
    }

    for (const requiredId of RESEARCH_JOURNEY_STAGE_IDS) {
      if (!stageIds.includes(requiredId)) {
        ctx.addIssue({
          code: "custom",
          message: `Missing required journey stage: ${requiredId}`,
          path: ["journeyStages"],
        });
      }
    }

    if (stageIds.length !== RESEARCH_JOURNEY_STAGE_IDS.length) {
      ctx.addIssue({
        code: "custom",
        message: `Journey must contain exactly ${RESEARCH_JOURNEY_STAGE_IDS.length} stages`,
        path: ["journeyStages"],
      });
    }

    for (let i = 0; i < RESEARCH_JOURNEY_STAGE_IDS.length; i += 1) {
      if (value.journeyStages[i]?.id !== RESEARCH_JOURNEY_STAGE_IDS[i]) {
        ctx.addIssue({
          code: "custom",
          message: `Journey stage sequence must be ${RESEARCH_JOURNEY_STAGE_IDS.join(" → ")}`,
          path: ["journeyStages", i, "id"],
        });
      }
    }

    const questionToStage = new Map<string, ResearchJourneyStageId>();
    value.journeyStages.forEach((stage, stageIndex) => {
      if (new Set(stage.requiredQuestionIds).size !== stage.requiredQuestionIds.length) {
        ctx.addIssue({
          code: "custom",
          message: "Duplicate required question ids within a stage are not allowed",
          path: ["journeyStages", stageIndex, "requiredQuestionIds"],
        });
      }

      for (const questionId of stage.questionIds) {
        if (!questionIdSet.has(questionId)) {
          ctx.addIssue({
            code: "custom",
            message: `Unknown question id "${questionId}" referenced by stage ${stage.id}`,
            path: ["journeyStages", stageIndex, "questionIds"],
          });
        }
        const prior = questionToStage.get(questionId);
        if (prior && prior !== stage.id) {
          ctx.addIssue({
            code: "custom",
            message: `Question "${questionId}" is assigned to multiple stages (${prior} and ${stage.id})`,
            path: ["journeyStages", stageIndex, "questionIds"],
          });
        } else {
          questionToStage.set(questionId, stage.id);
        }
      }

      for (const requiredId of stage.requiredQuestionIds) {
        if (!stage.questionIds.includes(requiredId)) {
          ctx.addIssue({
            code: "custom",
            message: `Required question "${requiredId}" must also appear in questionIds for stage ${stage.id}`,
            path: ["journeyStages", stageIndex, "requiredQuestionIds"],
          });
        }
      }
    });
  });

export function parseBlueprint(input: unknown): Blueprint {
  return blueprintSchema.parse(input);
}

export function safeParseBlueprint(input: unknown) {
  return blueprintSchema.safeParse(input);
}
