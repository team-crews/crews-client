import { z } from 'zod';

export const BaseQuestionSchema = z.object({
  id: z.number(),
  content: z.string(),
  necessity: z.boolean(),
  order: z.number(),
});

export const ChoiceSchema = z.object({
  id: z.number(),
  content: z.string(),
});
export const CreatedChoiceSchema = ChoiceSchema.extend({
  id: ChoiceSchema.shape.id.nullable(),
});

export const SelectiveQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('SELECTIVE'),
  wordLimit: z.null(),
  minimumSelection: z.number(),
  maximumSelection: z.number(),
  choices: z.array(ChoiceSchema),
});
export const CreatedSelectiveQuestionSchema = SelectiveQuestionSchema.extend({
  id: SelectiveQuestionSchema.shape.id.nullable(),
  choices: z.array(CreatedChoiceSchema),
});

export const NarrativeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('NARRATIVE'),
  wordLimit: z.number(),
  minimumSelection: z.null(),
  maximumSelection: z.null(),
  /*
      FixMe
      - Need a better way to express an empty array, or change it to null
     */
  choices: z.array(z.any()).length(0),
});
export const CreatedNarrativeQuestionSchema = NarrativeQuestionSchema.extend({
  id: NarrativeQuestionSchema.shape.id.nullable(),
});

export const QuestionSchema = z.union([
  SelectiveQuestionSchema,
  NarrativeQuestionSchema,
]);
export const CreatedQuestionSchema = z.union([
  CreatedSelectiveQuestionSchema,
  CreatedNarrativeQuestionSchema,
]);
