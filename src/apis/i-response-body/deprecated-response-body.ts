/*
  ToDo
  - Migrating types to zod!
  - This file should be removed
 */

import { IRecruitment } from '../../lib/types/models/i-recruitment.ts';
import { IApplication, ITempApplication } from '../../lib/types/models/i-application.ts';

type NoResponseData = '';

export type ISaveEvaluationResponse = NoResponseData;

export type IReadApplicationResponse = IApplication;

export type ISaveApplicationResponse = ITempApplication;

export type IReadRecruitmentByCodeResponse = IRecruitment;

export type ILoginResponse = {
  username: string;
  accessToken: string;
};

export type ILogoutResponse = NoResponseData;
