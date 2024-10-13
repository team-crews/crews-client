/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ILoginResponse,
  ILogoutResponse,
  IReadApplicationDetailResponse,
  IReadApplicationOverviewsResponse,
  IReadApplicationResponse,
  IReadRecruitmentByCodeResponse,
  ISaveApplicationResponse,
  ISaveEvaluationResponse
} from './i-response-body.ts';
import { isIRecruitment } from '../../lib/types/guards/i-recruitment-tg.ts';
import { isIApplication, isIApplicationOverview } from '../../lib/types/guards/i-application-tg.ts';

export function isIReadApplicationOverviewsResponse(
  obj: any,
): obj is IReadApplicationOverviewsResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every(isIApplicationOverview)
  );
}

export function isIReadApplicationDetailResponse(
  obj: any,
): obj is IReadApplicationDetailResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

export function isISaveEvaluationResponse(
  obj: any,
): obj is ISaveEvaluationResponse {
  return obj === '';
}

export function isIReadApplicationResponse(
  obj: any,
): obj is IReadApplicationResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

export function isISaveApplicationResponse(
  obj: any,
): obj is ISaveApplicationResponse {
  return typeof obj === 'object' && obj !== null && isIApplication(obj);
}

export function isIReadRecruitmentByCodeResponse(
  obj: any,
): obj is IReadRecruitmentByCodeResponse {
  return typeof obj === 'object' && obj !== null && isIRecruitment(obj);
}

export function isILoginResponse(obj: any): obj is ILoginResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.username === 'string' &&
    typeof obj.accessToken === 'string'
  );
}

export function isILogoutResponse(obj: any): obj is ILogoutResponse {
  return obj === '';
}
