import useAuthInstance from './instance.ts';
import {
  IReadApplicationResponse,
  ISaveApplicationResponse,
  isIReadApplicationResponse,
  isISaveApplicationResponse,
} from '../lib/model/i-response-body.ts';
import { ICreatedApplication } from '../lib/model/i-application.ts';

const useApplicantAPi = (recruitmentCode: string) => {
  const { authInstance } = useAuthInstance();

  /*
    Applicant checks and manipulates own application by accessToken and recruitmentCode.
    (Because an applicant may have multiple recruitments, recruitmentCode is essential to specify a single application)
    The accessToken is automatically included in the header by using authInstance.
    And the recruitmentCode needs to be earned from the path parameter.

    Assume role check is completed in require-auth wrapper.
   */

  async function readApplication(): Promise<IReadApplicationResponse> {
    const response = await authInstance.get(
      `/applications/mine?code=${recruitmentCode}`,
    );

    if (isIReadApplicationResponse(response.data)) return response.data;
    throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function saveApplication(
    requestBody: ICreatedApplication,
  ): Promise<ISaveApplicationResponse> {
    const response = await authInstance.post('applications', requestBody);

    if (isISaveApplicationResponse(response.data)) return response.data;
    throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  return { readApplication, saveApplication };
};

export default useApplicantAPi;
