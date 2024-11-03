import { z } from 'zod';
import {
  CreatedRecruitmentSchema,
  DateAndTimeSchema,
  DeadlineSchema,
  RecruitmentSchema,
} from '../types/schemas/recruitment-schema.ts';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function convertRecruitmentToCreatedRecruitment(
  recruitment: z.infer<typeof RecruitmentSchema>,
): z.infer<typeof CreatedRecruitmentSchema> {
  const dateAndTime = convertDeadlineToDateAndTime(recruitment.deadline);

  return {
    ...recruitment,
    ...dateAndTime,
  };
}

export function convertDeadlineToDateAndTime(
  deadline: z.infer<typeof DeadlineSchema>,
): z.infer<typeof DateAndTimeSchema> {
  return {
    deadlineDate: dayjs(deadline).format('YYYY-MM-DD'),
    deadlineTime: dayjs(deadline).format('HH:mm'),
  };
}

export function convertDateAndTimeToDeadline(
  schema: z.infer<typeof DateAndTimeSchema>,
): z.infer<typeof DeadlineSchema> {
  return dayjs(`${schema.deadlineDate} ${schema.deadlineTime}`).toISOString();
}

export function convertUTCtoSeoul(
  inputDate: z.infer<typeof DeadlineSchema>,
): z.infer<typeof DeadlineSchema> {
  return dayjs(inputDate).add(9, 'hours').toISOString();
}

export function convertSeoulToUTC(
  inputDate: z.infer<typeof DeadlineSchema>,
): z.infer<typeof DeadlineSchema> {
  return dayjs(inputDate).add(-9, 'hours').toISOString();
}
