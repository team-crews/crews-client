import useAuthInstance from './instance.ts';
import {
  // IReadApplicationResponse,
  ISaveApplicationResponse,
  // isIReadApplicationResponse,
  // isISaveApplicationResponse,
} from '../lib/model/i-response-body.ts';
import {
  // ICreatedApplication,
  ISaveApplicationRequest,
  ITempReadApplicationResponse,
} from '../lib/model/i-application.ts';
import { throwCustomError } from '../lib/utils/error.ts';

const useApplicantApi = (recruitmentCode: string) => {
  const { authInstance } = useAuthInstance();

  /*
    Applicant checks and manipulates own application by accessToken and recruitmentCode.
    (Because an applicant may have multiple recruitments, recruitmentCode is essential to specify a single application)
    The accessToken is automatically included in the header by using authInstance.
    And the recruitmentCode needs to be earned from the path parameter.

    Assume role check is completed in require-auth wrapper.
   */

  async function readApplication(): Promise<ITempReadApplicationResponse> {
    try {
      const response = await authInstance.get(
        `/applications/mine?code=${recruitmentCode}`,
      );

      // if (isIReadApplicationResponse(response.data))
      return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'readApplication');
    }
  }

  async function saveApplication(
    requestBody: ISaveApplicationRequest,
  ): Promise<ISaveApplicationResponse> {
    try {
      const response = await authInstance.post('applications', requestBody);

      // if (isISaveApplicationResponse(response.data))
      return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'saveApplication');
    }
  }

  return { readApplication, saveApplication };
};

export default useApplicantApi;
