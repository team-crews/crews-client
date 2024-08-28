import { baseInstance } from './instance.ts';

/*
   Apis that don't use authentication which means that non-user clients may also call these.
   (No need to set credentials)
  */

async function readRecruitmentByCode(recruitmentCode: string) {
  const response = await baseInstance.get(
    `recruitments?code=${recruitmentCode}`,
  );
  return response.data;
}

export { readRecruitmentByCode };
