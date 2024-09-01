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
import { throwCustomError } from '../lib/utils/error.ts';

const useAdminApi = () => {
  const { authInstance } = useAuthInstance();

  /*
    Admin checks and manipulates own recruitment by accessToken.
    Every api call only needs an accessToken for authorization and recruitment specification.
    The token is automatically included in the header by using authInstance.

    Assume role check is completed in require-auth wrapper
   */

  async function readRecruitmentProgress(): Promise<IReadRecruitmentProgressResponse> {
    try {
      const response = await authInstance.get('/recruitments/progress');

      if (isIRecruitmentProgressResponse(response.data)) return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'readRecruitmentProgress');
    }
  }

  async function readRecruitmentInProgressDetail(): Promise<IReadRecruitmentInProgressDetailResponse> {
    try {
      const response = await authInstance.get('/recruitments/in-progress');

      if (isIReadRecruitmentInProgressDetailResponse(response.data))
        return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'readRecruitmentInProgressDetail');
    }
  }

  async function readRecruitment(): Promise<IReadRecruitmentResponse> {
    try {
      const response = await authInstance.get('/recruitments/ready');

      if (isIReadRecruitmentResponse(response.data)) return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'readRecruitment');
    }
  }

  async function saveRecruitment(
    requestBody: ICreatedRecruitment,
  ): Promise<ISaveRecruitmentResponse> {
    try {
      const response = await authInstance.post('/recruitments', requestBody);

      if (isISaveRecruitmentResponse(response.data)) return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'saveRecruitment');
    }
  }

  async function startRecruitment(): Promise<IStartRecruitmentResponse> {
    try {
      const response = await authInstance.patch('recruitments/in-progress');

      if (isIStartRecruitmentResponse(response.data)) return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'startRecruitment');
    }
  }

  async function changeDeadline(requestBody: {
    deadline: string;
  }): Promise<IChangeDeadlineResponse> {
    try {
      const response = await authInstance.patch(
        '/recruitments/deadline',
        requestBody,
      );

      if (isIChangeDeadlineResponse(response.data)) return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'changeDeadline');
    }
  }

  async function sendEvaluationMail(): Promise<ISendEvaluationMailResponse> {
    try {
      const response = await authInstance.post('/recruitments/announcement');

      if (isISendEvaluationMailResponse(response.data)) return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'sendEvaluationMail');
    }
  }

  async function readApplicationOverviews(): Promise<IReadApplicationOverviewsResponse> {
    try {
      const response = await authInstance.get('/applications');

      if (isIReadApplicationOverviewsResponse(response.data))
        return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'readApplicationOverviews');
    }
  }

  async function readApplicationDetail(
    applicationId: number,
  ): Promise<IReadApplicationDetailResponse> {
    try {
      const response = await authInstance.get(`/applications/${applicationId}`);

      if (isIReadApplicationDetailResponse(response.data)) return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'readApplicationDetail');
    }
  }

  async function saveEvaluation(requestBody: {
    passApplicationIds: number[];
  }): Promise<ISaveEvaluationResponse> {
    try {
      const response = await authInstance.post(
        'applications/evaluation',
        requestBody,
      );

      if (isISaveEvaluationResponse(response.data)) return response.data;
      throw new Error('[ResponseTypeMismatch] Unexpected response format');
    } catch (e) {
      throwCustomError(e, 'saveEvaluation');
    }
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
