import { IProgress, isIProgress } from './i-progress.ts';

export type IReadRecruitmentProgressResponse = {
  recruitmentProgress: IProgress;
};

export type IReadRecruitmentInProgressDetailResponse = {
  recruitmentCode: string;
  applicationCount: number;
  deadline: string;
};

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
    typeof obj.recruitmentCode === 'string' &&
    typeof obj.applicationCount === 'number' &&
    typeof obj.deadline === 'string'
  );
}

export {
  isIRecruitmentProgressResponse,
  isIReadRecruitmentInProgressDetailResponse,
};
