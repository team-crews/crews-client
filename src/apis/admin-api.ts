import useAuthInstance from './instance.ts';
import {
  IChangeDeadlineResponse,
  IReadApplicationDetailResponse,
  IReadApplicationOverviewsResponse,
  IReadRecruitmentInProgressDetailResponse,
  IReadRecruitmentProgressResponse,
  IReadRecruitmentResponse,
  ISaveEvaluationResponse,
  ISaveRecruitmentResponse,
  ISendEvaluationMailResponse,
  isIChangeDeadlineResponse,
  isIReadApplicationDetailResponse,
  isIReadApplicationOverviewsResponse,
  isIReadRecruitmentInProgressDetailResponse,
  isIReadRecruitmentResponse,
  isIRecruitmentProgressResponse,
  isISaveEvaluationResponse,
  isISaveRecruitmentResponse,
  isISendEvaluationMailResponse,
  isIStartRecruitmentResponse,
  IStartRecruitmentResponse,
} from '../lib/model/i-response-body.ts';
import { ICreatedRecruitment } from '../lib/model/i-recruitment.ts';

const useAdminApi = () => {
  const { authInstance } = useAuthInstance();

  /*
    Admin checks and manipulates own recruitment by accessToken.
    Every api call only needs an accessToken for authorization and recruitment specification.
    The token is automatically included in the header by using authInstance.

    Assume role check is completed in require-auth wrapper
   */

  async function readRecruitmentProgress(): Promise<IReadRecruitmentProgressResponse> {
    const response = await authInstance.get('/recruitments/progress');

    if (isIRecruitmentProgressResponse(response.data)) return response.data;
    throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function readRecruitmentInProgressDetail(): Promise<IReadRecruitmentInProgressDetailResponse> {
    const response = await authInstance.get('/recruitments/in-progress');

    if (isIReadRecruitmentInProgressDetailResponse(response.data))
      return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function readRecruitment(): Promise<IReadRecruitmentResponse> {
    const response = await authInstance.get('/recruitments/ready');

    if (isIReadRecruitmentResponse(response.data)) return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function saveRecruitment(
    requestBody: ICreatedRecruitment,
  ): Promise<ISaveRecruitmentResponse> {
    const response = await authInstance.post('/recruitments', requestBody);

    if (isISaveRecruitmentResponse(response.data)) return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function startRecruitment(): Promise<IStartRecruitmentResponse> {
    const response = await authInstance.patch('recruitments/in-progress');

    if (isIStartRecruitmentResponse(response.data)) return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function changeDeadline(requestBody: {
    deadline: string;
  }): Promise<IChangeDeadlineResponse> {
    const response = await authInstance.patch(
      '/recruitments/deadline',
      requestBody,
    );

    if (isIChangeDeadlineResponse(response.data)) return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function sendEvaluationMail(): Promise<ISendEvaluationMailResponse> {
    const response = await authInstance.post('/recruitments/announcement');

    if (isISendEvaluationMailResponse(response.data)) return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function readApplicationOverviews(): Promise<IReadApplicationOverviewsResponse> {
    const response = await authInstance.get('/applications');

    if (isIReadApplicationOverviewsResponse(response.data))
      return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function readApplicationDetail(
    applicationId: string,
  ): Promise<IReadApplicationDetailResponse> {
    const response = await authInstance.get(`/applications/${applicationId}`);

    if (isIReadApplicationDetailResponse(response.data)) return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
  }

  async function saveEvaluation(requestBody: {
    passApplicationIds: number[];
  }): Promise<ISaveEvaluationResponse> {
    const response = await authInstance.post(
      'applications/evaluation',
      requestBody,
    );

    if (isISaveEvaluationResponse(response.data)) return response.data;
    else throw new Error('[ResponseTypeMismatch] Unexpected response format');
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
