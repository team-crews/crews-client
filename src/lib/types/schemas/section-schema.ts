import { z } from 'zod';
import { CreatedQuestionSchema, QuestionSchema } from './question-schema.ts';
import WithNullableIdSchema from './nullable-id-schema.ts';

export const SectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  questions: z.array(QuestionSchema),
});

export const CreatedSectionSchema = WithNullableIdSchema(SectionSchema).extend({
  questions: z.array(CreatedQuestionSchema),
});
