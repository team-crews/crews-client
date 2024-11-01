import { z } from 'zod';
import { CreatedQuestionSchema, QuestionSchema } from './question-schema.ts';

export const SectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  questions: z.array(QuestionSchema),
});

export const CreatedSectionSchema = SectionSchema.extend({
  id: SectionSchema.shape.id.nullable(),
  questions: z.array(CreatedQuestionSchema),
});
