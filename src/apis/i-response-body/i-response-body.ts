import { IRecruitment } from '../../lib/types/models/i-recruitment.ts';
import {
  IApplication,
  IApplicationOverview,
  ITempApplication,
} from '../../lib/types/models/i-application.ts';

type NoResponseData = '';

export type IReadApplicationOverviewsResponse = IApplicationOverview[];

export type IReadApplicationDetailResponse = IApplication;

export type ISaveEvaluationResponse = NoResponseData;

export type IReadApplicationResponse = IApplication;

export type ISaveApplicationResponse = ITempApplication;

export type IReadRecruitmentByCodeResponse = IRecruitment;

export type ILoginResponse = {
  username: string;
  accessToken: string;
};

export type ILogoutResponse = NoResponseData;
