/*
  ToDo
  - Migrating types to zod!
  - This file should be removed
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IReadApplicationResponse,
  IReadRecruitmentByCodeResponse,
  ISaveApplicationResponse
} from './deprecated-response-body.ts';
import { isIRecruitment } from '../../lib/types/guards/i-recruitment-tg.ts';
import { isIApplication } from '../../lib/types/guards/i-application-tg.ts';

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
