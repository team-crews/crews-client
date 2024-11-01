import useAuthInstance from './instance.ts';

import { z } from 'zod';
import {
  ReadApplicationResponseSchema,
  SaveApplicationResponseSchema,
} from './response-body-schema.ts';
import { ISaveApplication } from '../lib/types/schemas/application-schema.ts';

const useApplicantApi = (recruitmentCode: string) => {
  const { authInstance } = useAuthInstance();

  /*
    Applicant checks and manipulates own application by accessToken and recruitmentCode.
    (Because an applicant may have multiple recruitments, recruitmentCode is essential to specify a single application)
    The accessToken is automatically included in the header by using authInstance.
    And the recruitmentCode needs to be earned from the path parameter.

    Assume role check is completed in require-auth wrapper.
   */

  async function readApplication(): Promise<
    z.infer<typeof ReadApplicationResponseSchema>
  > {
    const response = await authInstance.get(
      `/applications/mine?code=${recruitmentCode}`,
    );
    return ReadApplicationResponseSchema.parse(response.data);
  }

  async function saveApplication(
    requestBody: ISaveApplication,
  ): Promise<z.infer<typeof SaveApplicationResponseSchema>> {
    const response = await authInstance.post('applications', requestBody);
    return SaveApplicationResponseSchema.parse(response.data);
  }

  return { readApplication, saveApplication };
};

export default useApplicantApi;
