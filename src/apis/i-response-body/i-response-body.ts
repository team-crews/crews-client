import { IProgress } from '../../lib/types/models/i-progress.ts';
import { IRecruitment } from '../../lib/types/models/i-recruitment.ts';
import {
  IApplication,
  IApplicationOverview,
  ITempApplication,
} from '../../lib/types/models/i-application.ts';

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

export type ISaveApplicationResponse = ITempApplication;

export type IReadRecruitmentByCodeResponse = IRecruitment;

export type ILoginResponse = {
  username: string;
  accessToken: string;
};

export type ILogoutResponse = NoResponseData;
