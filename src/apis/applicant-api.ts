import useAuthInstance from './instance.ts';

const useApplicantAPi = (recruitmentCode: string) => {
  const { authInstance } = useAuthInstance();

  /*
    Applicant checks and manipulates own application by accessToken and recruitmentCode.
    (Because an applicant may have multiple recruitments, recruitmentCode is essential to specify a single application)
    The accessToken is automatically included in the header by using authInstance.
    And the recruitmentCode needs to be earned from the path parameter.

    Assume role check is completed in require-auth wrapper.
   */

  /*
    ToDo
    - readApplication response 타입 정의
   */
  async function readApplication() {
    const response = await authInstance.get(
      `/applications/mine?code=${recruitmentCode}`,
    );
    return response.data;
  }

  /*
    ToDo
    - readApplication requestBody 타입 정의
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function saveApplication(requestBody: any) {
    const response = await authInstance.post('applications', requestBody);
    return response.data;
  }

  return { readApplication, saveApplication };
};

export default useApplicantAPi;
