import { IProgress, isIProgress } from './i-progress.ts';
import {
  ICreatedSection,
  ISection,
  isICreatedSection,
  isISection,
  WithNullableId,
} from './i-section.ts';

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

export const CREATED_RECRUITMENT: ICreatedRecruitment = {
  id: null,
  title: '',
  description: '',
  deadline: '',
  sections: [
    {
      id: null,
      name: '공통',
      description:
        '공통 섹션은 모든 지원자가 답하는 섹션이며 섹션 삭제 및 섹션 명 수정이 불가합니다. 또한 공통 섹션 내 이름, 학번, 전공 입력 문항은 원활한 서비스 진행을 위해 필수적인 문항으로 삭제가 불가능합니다. 본 내용은 수정 가능합니다.',
      questions: [
        {
          id: null,
          content: '이름을 입력해주세요.',
          necessity: true,
          order: -1,
          type: 'NARRATIVE',
          wordLimit: 10,
          minimumSelection: null,
          maximumSelection: null,
          choices: [],
        },
        {
          id: null,
          content: '학번을 입력해주세요.',
          necessity: true,
          order: -1,
          type: 'NARRATIVE',
          wordLimit: 20,
          minimumSelection: null,
          maximumSelection: null,
          choices: [],
        },
        {
          id: null,
          content: '전공을 입력해주세요.',
          necessity: true,
          order: -1,
          type: 'NARRATIVE',
          wordLimit: 20,
          minimumSelection: null,
          maximumSelection: null,
          choices: [],
        },
      ],
    },
  ],
};

// ---------------------------------- Type Guards ----------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIRecruitment(obj: any): obj is IRecruitment {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
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
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.sections) &&
    obj.sections.every(isICreatedSection) &&
    typeof obj.deadline === 'string'
  );
}
