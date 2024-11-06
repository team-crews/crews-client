import { z } from 'zod';
import { ProgressSchema } from './progress-schema.ts';
import { CreatedSectionSchema, SectionSchema } from './section-schema.ts';

export const RecruitmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  recruitmentProgress: ProgressSchema,
  sections: z.array(SectionSchema),
  deadline: z.string().datetime({ offset: true }),
  code: z.string(),
});

export const CreatedRecruitmentSchema = RecruitmentSchema.omit({
  deadline: true,
  code: true,
  recruitmentProgress: true,
}).extend({
  id: RecruitmentSchema.shape.id.nullable(),
  sections: z.array(CreatedSectionSchema),
  deadlineDate: z.string().date(),
  deadlineTime: z.string().time(),
});

export const DeadlineSchema = RecruitmentSchema.pick({
  deadline: true,
}).transform((data) => data.deadline);

export const DateAndTimeSchema = CreatedRecruitmentSchema.pick({
  deadlineDate: true,
  deadlineTime: true,
});

export const RecruitmentSearchSchema = z.array(
  z.object({
    title: z.string(),
  }),
);
