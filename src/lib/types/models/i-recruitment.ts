import { IProgress } from './i-progress.ts';
import { ICreatedSection, ISection } from './i-section.ts';
import { WithNullableId } from './i-nullable-id.ts';

export type IRecruitment = {
  id: number;
  title: string;
  description: string;
  recruitmentProgress: IProgress;
  sections: ISection[];
  deadline: string;
  code: string;
};

export type ICreatedRecruitment = Omit<
  WithNullableId<IRecruitment>,
  'sections' | 'code' | 'recruitmentProgress'
> & {
  sections: ICreatedSection[];
};
