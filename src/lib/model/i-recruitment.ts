import { IProgress, isIProgress } from './i-progress.ts';
import {
  ICreatedSection,
  ISection,
  isICreatedSection,
  isISection,
  WithNullableId,
} from './i-section.ts';

export type IRecruitment = {
  id: string;
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

// ---------------------------------- Type Guards ----------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIRecruitment(obj: any): obj is IRecruitment {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    isIProgress(obj.recruitmentProgress) &&
    Array.isArray(obj.sections) &&
    obj.sections.every(isISection) &&
    typeof obj.deadline === 'string' &&
    typeof obj.code === 'string'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isICreatedRecruitment(obj: any): obj is ICreatedRecruitment {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'string') &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.sections) &&
    obj.sections.every(isICreatedSection) &&
    typeof obj.deadline === 'string'
  );
}
