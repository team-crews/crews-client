import useAuthInstance from './instance.ts';
import {
  ChangeDeadlineResponseSchema,
  ReadApplicationDetailResponseSchema,
  ReadApplicationOverviewsResponseSchema,
  ReadRecruitmentInProgressDetailResponseSchema,
  ReadRecruitmentProgressResponseSchema,
  ReadRecruitmentResponseSchema,
  SaveEvaluationResponseSchema,
  SaveRecruitmentRequestSchema,
  SaveRecruitmentResponseSchema,
  SendEvaluationMailResponseSchema,
  StartRecruitmentResponseSchema,
} from './response-body-schema.ts';
import { z } from 'zod';
import {
  convertDateAndTimeToDeadline,
  convertSeoulToUTC,
  convertUTCtoSeoul,
} from '../lib/utils/convert.ts';
import { DateAndTimeSchema } from '../lib/schemas/recruitment-schema.ts';

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
    return ReadRecruitmentProgressResponseSchema.parse(response.data);
  }

  async function readRecruitmentInProgressDetail(): Promise<
    z.infer<typeof ReadRecruitmentInProgressDetailResponseSchema>
  > {
    const response = await authInstance.get('/recruitments/in-progress');
    if (ReadRecruitmentInProgressDetailResponseSchema.parse(response.data)) {
      response.data.deadline = convertSeoulToUTC(response.data.deadline);
    }
    return response.data;
  }

  async function readRecruitment(): Promise<
    z.infer<typeof ReadRecruitmentResponseSchema>
  > {
    const response = await authInstance.get('/recruitments/ready');
    return ReadRecruitmentResponseSchema.parse(response.data);
  }

  async function saveRecruitment(
    requestBody: z.infer<typeof SaveRecruitmentRequestSchema>,
  ): Promise<z.infer<typeof SaveRecruitmentResponseSchema>> {
    requestBody.sections.forEach((section) => {
      section.questions.forEach((question, idx) => {
        question.order = idx + 1;
      });
    });
    requestBody.deadline = convertUTCtoSeoul(requestBody.deadline);

    const response = await authInstance.post('/recruitments', requestBody);
    return SaveRecruitmentResponseSchema.parse(response.data);
  }

  async function startRecruitment(): Promise<
    z.infer<typeof StartRecruitmentResponseSchema>
  > {
    const response = await authInstance.patch('recruitments/in-progress');
    return StartRecruitmentResponseSchema.parse(response.data);
  }

  async function changeDeadline(
    requestBody: z.infer<typeof DateAndTimeSchema>,
  ): Promise<z.infer<typeof ChangeDeadlineResponseSchema>> {
    const deadline = convertUTCtoSeoul(
      convertDateAndTimeToDeadline(requestBody),
    );

    const response = await authInstance.patch('/recruitments/deadline', {
      deadline,
    });
    return ChangeDeadlineResponseSchema.parse(response.data);
  }

  async function sendEvaluationMail(): Promise<
    z.infer<typeof SendEvaluationMailResponseSchema>
  > {
    const response = await authInstance.post('/recruitments/announcement');
    return SendEvaluationMailResponseSchema.parse(response.data);
  }

  async function readApplicationOverviews(): Promise<
    z.infer<typeof ReadApplicationOverviewsResponseSchema>
  > {
    const response = await authInstance.get('/applications');
    return ReadApplicationOverviewsResponseSchema.parse(response.data);
  }

  async function readApplicationDetail(
    applicationId: number,
  ): Promise<z.infer<typeof ReadApplicationDetailResponseSchema>> {
    const response = await authInstance.get(`/applications/${applicationId}`);
    return ReadApplicationDetailResponseSchema.parse(response.data);
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
