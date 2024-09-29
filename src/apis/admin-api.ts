import useAuthInstance from './instance.ts';
import {
  IReadApplicationDetailResponse,
  IReadApplicationOverviewsResponse,
} from './i-response-body/i-response-body.ts';
import { ICreatedRecruitment } from '../lib/types/models/i-recruitment.ts';
import { throwCustomError } from '../lib/utils/error.ts';
import {
  isIReadApplicationDetailResponse,
  isIReadApplicationOverviewsResponse,
} from './i-response-body/i-response-body-tg.ts';
import {
  ChangeDeadlineResponseSchema,
  ReadRecruitmentInProgressDetailResponseSchema,
  ReadRecruitmentProgressResponseSchema,
  ReadRecruitmentResponseSchema,
  SaveEvaluationResponseSchema,
  SaveRecruitmentResponseSchema,
  SendEvaluationMailResponseSchema,
  StartRecruitmentResponseSchema,
} from './i-response-body/response-body-schema.ts';
import { z } from 'zod';

const useAdminApi = () => {
  const { authInstance } = useAuthInstance();

  /*
    Admin checks and manipulates own recruitment by accessToken.
    Every api call only needs an accessToken for authorization and recruitment specification.
    The token is automatically included in the header by using authInstance.

    Assume role check is completed in require-auth wrapper
   */

  async function readRecruitmentProgress(): Promise<
    z.infer<typeof ReadRecruitmentProgressResponseSchema>
  > {
    const response = await authInstance.get('/recruitments/progress');
    // @ts-expect-error testing
    return ReadRecruitmentInProgressDetailResponseSchema.parse(response.data);
    // return ReadRecruitmentProgressResponseSchema.parse(response.data);
  }

  async function readRecruitmentInProgressDetail(): Promise<
    z.infer<typeof ReadRecruitmentInProgressDetailResponseSchema>
  > {
    const response = await authInstance.get('/recruitments/in-progress');
    return ReadRecruitmentInProgressDetailResponseSchema.parse(response.data);
  }

  async function readRecruitment(): Promise<
    z.infer<typeof ReadRecruitmentResponseSchema>
  > {
    const response = await authInstance.get('/recruitments/ready');
    return ReadRecruitmentResponseSchema.parse(response.data);
  }

  async function saveRecruitment(
    requestBody: ICreatedRecruitment,
  ): Promise<z.infer<typeof SaveRecruitmentResponseSchema>> {
    requestBody.sections.forEach((section) => {
      section.questions.forEach((question, idx) => {
        question.order = idx + 1;
      });
    });

    const match = requestBody.deadline.match(
      /^(\d{2})-(\d{2})-(\d{2})-(\d{2})$/,
    );
    const [_, year, month, day, hour] = match!;
    requestBody.deadline = `20${year}-${month}-${day}T${hour}:00:00`;

    const response = await authInstance.post('/recruitments', requestBody);
    return SaveRecruitmentResponseSchema.parse(response.data);
  }

  async function startRecruitment(): Promise<
    z.infer<typeof StartRecruitmentResponseSchema>
  > {
    const response = await authInstance.patch('recruitments/in-progress');
    return StartRecruitmentResponseSchema.parse(response.data);
  }

  async function changeDeadline(requestBody: {
    deadline: string;
  }): Promise<z.infer<typeof ChangeDeadlineResponseSchema>> {
    const match = requestBody.deadline.match(
      /^(\d{2})-(\d{2})-(\d{2})-(\d{2})$/,
    );
    const [_, year, month, day, hour] = match!;
    requestBody.deadline = `20${year}-${month}-${day}T${hour}:00:00`;

    const response = await authInstance.patch(
      '/recruitments/deadline',
      requestBody,
    );
    return ChangeDeadlineResponseSchema.parse(response.data);
  }

  async function sendEvaluationMail(): Promise<
    z.infer<typeof SendEvaluationMailResponseSchema>
  > {
    const response = await authInstance.post('/recruitments/announcement');
    return SendEvaluationMailResponseSchema.parse(response.data);
  }

  /*
    ToDo
    - Change to zod types
   */
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

  /*
    ToDo
    - Change to zod types
   */
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
  }): Promise<z.infer<typeof SaveEvaluationResponseSchema>> {
    const response = await authInstance.post(
      'applications/evaluation',
      requestBody,
    );

    return SaveEvaluationResponseSchema.parse(response.data);
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
