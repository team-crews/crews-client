import { IProgress } from './i-progress.ts';
import { ISection } from './i-section.ts';

export type IRecruitment = {
  id: number;
  title: string;
  description: string;
  recruitmentProgress: IProgress;
  sections: ISection[];
  deadline: string;
  code: string;
};
