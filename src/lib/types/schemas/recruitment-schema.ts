import { z } from 'zod';
import { ProgressSchema } from './progress-schema.ts';
import { CreatedSectionSchema, SectionSchema } from './section-schema.ts';
import WithNullableIdSchema from './nullable-id-schema.ts';

export const RecruitmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  recruitmentProgress: ProgressSchema,
  sections: z.array(SectionSchema),
  deadline: z.string(),
  code: z.string(),
});

export const CreatedRecruitmentSchema = WithNullableIdSchema(RecruitmentSchema)
  .omit({
    code: true,
    recruitmentProgress: true,
  })
  .extend({
    sections: z.array(CreatedSectionSchema),
  });
