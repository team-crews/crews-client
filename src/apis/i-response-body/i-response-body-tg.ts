/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IChangeDeadlineResponse,
  ILoginResponse,
  ILogoutResponse,
  IReadApplicationDetailResponse,
  IReadApplicationOverviewsResponse,
  IReadApplicationResponse,
  IReadRecruitmentByCodeResponse,
  IReadRecruitmentInProgressDetailResponse,
  IReadRecruitmentProgressResponse,
  IReadRecruitmentResponse,
  ISaveApplicationResponse,
  ISaveEvaluationResponse,
  ISaveRecruitmentResponse,
  ISendEvaluationMailResponse,
  IStartRecruitmentResponse
} from './i-response-body.ts';
import { isIRecruitment } from '../../lib/types/guards/i-recruitment-tg.ts';
import { isIProgress } from '../../lib/types/guards/i-progress-tg.ts';
import { isIApplication, isIApplicationOverview } from '../../lib/types/guards/i-application-tg.ts';

function isIRecruitmentProgressResponse(
  obj: any,
): obj is IReadRecruitmentProgressResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    isIProgress(obj.recruitmentProgress)
  );
}

export { isIRecruitmentProgressResponse };

function isIReadRecruitmentInProgressDetailResponse(
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
  obj: any,
  status: number,
): obj is IReadRecruitmentResponse {
  if (status === 204) return obj === '';
  else return typeof obj === 'object' && obj !== null && isIRecruitment(obj);
}

function isISaveRecruitmentResponse(obj: any): obj is ISaveRecruitmentResponse {
  return typeof obj === 'object' && obj !== null && isIRecruitment(obj);
}

function isIStartRecruitmentResponse(
  obj: any,
): obj is IStartRecruitmentResponse {
  return obj === '';
}

function isIChangeDeadlineResponse(obj: any): obj is IChangeDeadlineResponse {
  return obj === '';
}

function isISendEvaluationMailResponse(
  obj: any,
): obj is ISendEvaluationMailResponse {
  return obj === '';
}

function isIReadApplicationOverviewsResponse(
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
  obj: any,
): obj is IReadApplicationDetailResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

function isISaveEvaluationResponse(obj: any): obj is ISaveEvaluationResponse {
  return obj === '';
}

function isIReadApplicationResponse(obj: any): obj is IReadApplicationResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

function isISaveApplicationResponse(obj: any): obj is ISaveApplicationResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

function isIReadRecruitmentByCodeResponse(
  obj: any,
): obj is IReadRecruitmentByCodeResponse {
  return typeof obj === 'object' && obj !== null && isIRecruitment(obj);
}

function isILoginResponse(obj: any): obj is ILoginResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.username === 'string' &&
    typeof obj.accessToken === 'string'
  );
}

function isILogoutResponse(obj: any): obj is ILogoutResponse {
  return obj === '';
}

export {
  isILogoutResponse,
  isILoginResponse,
  isIReadRecruitmentByCodeResponse,
  isISaveApplicationResponse,
  isIReadApplicationResponse,
  isISaveEvaluationResponse,
  isIReadApplicationDetailResponse,
  isIReadApplicationOverviewsResponse,
  isISendEvaluationMailResponse,
  isIChangeDeadlineResponse,
  isIStartRecruitmentResponse,
  isISaveRecruitmentResponse,
  isIReadRecruitmentResponse,
  isIReadRecruitmentInProgressDetailResponse,
};
