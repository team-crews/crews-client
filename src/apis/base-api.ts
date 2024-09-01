import { baseInstance } from './instance.ts';
import {
  IReadRecruitmentByCodeResponse,
  isIReadRecruitmentByCodeResponse,
} from '../lib/model/i-response-body.ts';

/*
   Apis that don't use authentication which means that non-user clients may also call these.
   (No need to set credentials)
  */

async function readRecruitmentByCode(
  recruitmentCode: string,
): Promise<IReadRecruitmentByCodeResponse> {
  const response = await baseInstance.get(
    `recruitments?code=${recruitmentCode}`,
  );

  if (isIReadRecruitmentByCodeResponse(response.data)) return response.data;
  throw new Error('[ResponseTypeMismatch] Unexpected response format');
}

export { readRecruitmentByCode };
