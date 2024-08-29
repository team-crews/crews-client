import { IProgress } from '../lib/model/i-progress.ts';
import { IApplicationOverview } from '../lib/model/i-application.ts';
import useAuthInstance from './instance.ts';

const useAdminApi = () => {
  const { authInstance } = useAuthInstance();

  /*
    Admin checks and manipulates own recruitment by accessToken.
    Every api call only needs an accessToken for authorization and recruitment specification.
    The token is automatically included in the header by using authInstance.

    Assume role check is completed in require-auth wrapper
   */

  async function readRecruitmentProgress(): Promise<{
    recruitmentProgress: IProgress;
  }> {
    const response = await authInstance.get('/recruitments/progress');
    return response.data;
  }

  /*
    ToDo
    - readRecruitment response 타입 정의
   */
  async function readRecruitment() {
    const response = await authInstance.get('/recruitments/ready');
    return response.data;
  }

  /*
    ToDo
    - saveRecruitment requestBody 타입 정의
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function saveRecruitment(requestBody: any) {
    const response = await authInstance.post('/recruitments', requestBody);
    return response.data;
  }

  async function startRecruitment() {
    const response = await authInstance.patch('recruitments/in-progress');
    return response.data;
  }

  async function readRecruitmentInProgressDetail(): Promise<{
    applicationCount: number;
    deadline: string;
  }> {
    const response = await authInstance.get('/recruitments/in-progress');
    return response.data;
  }

  async function changeDeadline(requestBody: { deadline: string }) {
    const response = await authInstance.patch(
      '/recruitments/deadline',
      requestBody,
    );
    return response.data;
  }

  async function sendEvaluationMail() {
    const response = await authInstance.post('/recruitments/announcement');
    return response.data;
  }

  async function readApplicationOverviews(): Promise<IApplicationOverview[]> {
    const response = await authInstance.get('/applications');
    return response.data;
  }

  /*
    ToDo
    - readApplicationDetail response 타입 정의
   */
  async function readApplicationDetail(applicationId: string) {
    const response = await authInstance.get(`/applications/${applicationId}`);
    return response.data;
  }

  async function saveEvaluation(requestBody: { passApplicationIds: number[] }) {
    const response = await authInstance.post(
      'applications/evaluation',
      requestBody,
    );
    return response.data;
  }

  return {
    readRecruitmentProgress,
    readRecruitment,
    readRecruitmentInProgressDetail,
    saveRecruitment,
    startRecruitment,
    changeDeadline,
    sendEvaluationMail,
    readApplicationOverviews,
    readApplicationDetail,
    saveEvaluation,
  };
};

export default useAdminApi;
