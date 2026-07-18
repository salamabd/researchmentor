import { z } from "zod";
import type { Blueprint, BlueprintPurpose } from "../domain/types";

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

export const blueprintSchema = z
  .object({
    id: nonEmpty,
    version: nonEmpty,
    purpose: blueprintPurposeSchema,
    title: nonEmpty,
    questions: z.array(blueprintQuestionSchema).min(1),
    alternatives: z.array(alternativeSchema).min(1),
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
    const alternativeIds = value.alternatives.map((a) => a.id);
    if (new Set(alternativeIds).size !== alternativeIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate alternative ids are not allowed",
        path: ["alternatives"],
      });
    }
  });

export function parseBlueprint(input: unknown): Blueprint {
  return blueprintSchema.parse(input);
}

export function safeParseBlueprint(input: unknown) {
  return blueprintSchema.safeParse(input);
}
