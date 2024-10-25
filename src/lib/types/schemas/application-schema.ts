import { z } from 'zod';
import { SectionSchema } from './section-schema.ts';

export const ApplicationOverviewSchema = z.object({
  id: z.number(),
  studentNumber: z.string(),
  name: z.string(),
  major: z.string(),
  outcome: z.enum(['PASS', 'FAIL', 'PENDING']),
});

export const NarrativeAnswerSchema = z.object({
  questionId: z.number(),
  content: z.string().nullable(),
  choiceIds: z.null(),
  type: z.literal('NARRATIVE'),
});

export const SelectiveAnswerSchema = z.object({
  questionId: z.number(),
  content: z.null(),
  choiceIds: z.array(z.number()).nullable(),
  type: z.literal('SELECTIVE'),
});

export const AnswerSchema = z.union([
  NarrativeAnswerSchema,
  SelectiveAnswerSchema,
]);

export const AnswersBySectionSchema = z.object({
  sectionId: SectionSchema.shape.id,
  answers: z.array(AnswerSchema),
});

export const ApplicationDetailSchema = ApplicationOverviewSchema.omit({
  outcome: true,
}).extend({
  sections: z.array(AnswersBySectionSchema),
});
