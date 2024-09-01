import { IProgress, isIProgress } from './i-progress.ts';
import { IRecruitment, isIRecruitment } from './i-recruitment.ts';
import {
  IApplication,
  IApplicationOverview,
  isIApplication,
  isIApplicationOverview,
} from './i-application.ts';

export type IReadRecruitmentProgressResponse = {
  recruitmentProgress: IProgress;
};

export type IReadRecruitmentInProgressDetailResponse = {
  code: string;
  applicationCount: number;
  deadline: string;
};

type NoResponseData = '';

export type IReadRecruitmentResponse = IRecruitment;

export type ISaveRecruitmentResponse = IRecruitment;

export type IStartRecruitmentResponse = NoResponseData;

export type IChangeDeadlineResponse = NoResponseData;

export type ISendEvaluationMailResponse = NoResponseData;

export type IReadApplicationOverviewsResponse = IApplicationOverview[];

export type IReadApplicationDetailResponse = IApplication;

export type ISaveEvaluationResponse = NoResponseData;

export type IReadApplicationResponse = IApplication;

export type ISaveApplicationResponse = IApplication;

export type IReadRecruitmentByCodeResponse = IRecruitment;

export type ILoginResponse = {
  username: string;
  accessToken: string;
};

// ---------------------------------- Type Guards ----------------------------------

function isIRecruitmentProgressResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IReadRecruitmentProgressResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    isIProgress(obj.recruitmentProgress)
  );
}

function isIReadRecruitmentInProgressDetailResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IReadRecruitmentInProgressDetailResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.code === 'string' &&
    typeof obj.applicationCount === 'number' &&
    typeof obj.deadline === 'string'
  );
}

function isIReadRecruitmentResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IReadRecruitmentResponse {
  return typeof obj === 'object' && obj !== null && isIRecruitment(obj);
}

function isISaveRecruitmentResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is ISaveRecruitmentResponse {
  return typeof obj === 'object' && obj !== null && isIRecruitment(obj);
}

function isIStartRecruitmentResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IStartRecruitmentResponse {
  return obj === '';
}

function isIChangeDeadlineResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IChangeDeadlineResponse {
  return obj === '';
}

function isISendEvaluationMailResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is ISendEvaluationMailResponse {
  return obj === '';
}

function isIReadApplicationOverviewsResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IReadApplicationOverviewsResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every(isIApplicationOverview)
  );
}

function isIReadApplicationDetailResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IReadApplicationDetailResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

function isISaveEvaluationResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is ISaveEvaluationResponse {
  return obj === '';
}

function isIReadApplicationResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IReadApplicationResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

function isISaveApplicationResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is ISaveApplicationResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

function isIReadRecruitmentByCodeResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IReadRecruitmentByCodeResponse {
  return typeof obj === 'object' && obj !== null && isIRecruitment(obj);
}

//
// export type ILoginResponse = {
//   username: string;
//   accessToken: string;
// };
function isILoginResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is ILoginResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.username === 'string' &&
    typeof obj.accessToken === 'string'
  );
}

export {
  isIRecruitmentProgressResponse,
  isIReadRecruitmentInProgressDetailResponse,
  isIReadRecruitmentResponse,
  isISaveRecruitmentResponse,
  isIStartRecruitmentResponse,
  isIChangeDeadlineResponse,
  isISendEvaluationMailResponse,
  isIReadApplicationOverviewsResponse,
  isIReadApplicationDetailResponse,
  isISaveEvaluationResponse,
  isIReadApplicationResponse,
  isISaveApplicationResponse,
  isIReadRecruitmentByCodeResponse,
  isILoginResponse,
};
