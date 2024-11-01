import { baseInstance } from './instance.ts';
import { z } from 'zod';
import { ReadRecruitmentByCodeResponseSchema } from './response-body-schema.ts';

/*
   Apis that don't use authentication which means that non-user clients may also call these.
   (No need to set credentials)
  */

export async function readRecruitmentByCode(
  recruitmentCode: string,
): Promise<z.infer<typeof ReadRecruitmentByCodeResponseSchema>> {
  const response = await baseInstance.get(
    `recruitments?code=${recruitmentCode}`,
  );
  return ReadRecruitmentByCodeResponseSchema.parse(response.data);
}
