import { z } from 'zod';
import { ProgressSchema } from '../lib/types/schemas/progress-schema.ts';
import {
  CreatedRecruitmentSchema,
  RecruitmentSchema,
  RecruitmentSearchSchema,
} from '../lib/types/schemas/recruitment-schema.ts';
import {
  ApplicationDetailSchema,
  ApplicationOverviewSchema,
} from '../lib/types/schemas/application-schema.ts';

const NoResponseDataSchema = z.literal('');

export const ReadRecruitmentProgressResponseSchema = z.object({
  recruitmentProgress: ProgressSchema,
});

export const ReadRecruitmentInProgressDetailResponseSchema = z.object({
  code: z.string(),
  applicationCount: z.number(),
  deadline: RecruitmentSchema.shape.deadline,
});

export const StartRecruitmentResponseSchema = NoResponseDataSchema;

export const ChangeDeadlineResponseSchema = NoResponseDataSchema;

export const SendEvaluationMailResponseSchema = NoResponseDataSchema;

export const SaveEvaluationResponseSchema = NoResponseDataSchema;

export const LoginResponseSchema = z.object({
  username: z.string(),
  accessToken: z.string(),
});

export const LogoutResponseSchema = NoResponseDataSchema;

export const ReadRecruitmentResponseSchema =
  RecruitmentSchema.or(NoResponseDataSchema);

export const SaveRecruitmentRequestSchema = CreatedRecruitmentSchema.omit({
  deadlineDate: true,
  deadlineTime: true,
}).extend({
  deadline: RecruitmentSchema.shape.deadline,
});
export const SaveRecruitmentResponseSchema = RecruitmentSchema;

export const ReadApplicationOverviewsResponseSchema = z.array(
  ApplicationOverviewSchema,
);

export const ReadApplicationDetailResponseSchema = ApplicationDetailSchema;

export const ReadApplicationResponseSchema =
  ApplicationDetailSchema.or(NoResponseDataSchema);

export const SaveApplicationResponseSchema = ApplicationDetailSchema;

export const ReadRecruitmentByCodeResponseSchema = RecruitmentSchema;

export const ReadRecruitmentSearchResponseSchema = z.array(
  RecruitmentSearchSchema,
);
