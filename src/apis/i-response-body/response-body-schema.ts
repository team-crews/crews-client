import { z } from 'zod';
import { ProgressSchema } from '../../lib/types/schemas/progress-schema.ts';
import { RecruitmentSchema } from '../../lib/types/schemas/recruitment-schema.ts';

const NoResponseDataSchema = z.literal('');

export const ReadRecruitmentProgressResponseSchema = z.object({
  recruitmentProgress: ProgressSchema,
});

export const ReadRecruitmentInProgressDetailResponseSchema = z.object({
  code: z.string(),
  applicationCount: z.number(),
  deadline: z.string(),
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

export const ReadRecruitmentResponseSchema = RecruitmentSchema;

export const SaveRecruitmentResponseSchema = RecruitmentSchema;

/*
  ToDo
  -  change to zod type system
 */

// export const iReadApplicationOverviewsResponseSchema = z.array(
//   iApplicationOverviewSchema,
// );
//
// export const iReadApplicationDetailResponseSchema = iApplicationSchema;
//
// export const iReadApplicationResponseSchema = iApplicationSchema;
//
// export const iSaveApplicationResponseSchema = iTempApplicationSchema;

export const ReadRecruitmentByCodeResponseSchema = RecruitmentSchema;
