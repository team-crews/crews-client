import {
  ICreatedChoice,
  ICreatedNarrativeQuestion,
  ICreatedSelectiveQuestion,
} from './models/i-question.ts';
import { ICreatedSection } from './models/i-section.ts';
import { ICreatedRecruitment } from './models/i-recruitment.ts';

export const CREATED_NARRATIVE_QUESTION: ICreatedNarrativeQuestion = {
  id: null,
  type: 'NARRATIVE',
  content: '',
  necessity: true,
  wordLimit: 100,
  minimumSelection: null,
  maximumSelection: null,
  choices: [],
  order: -1,
};

export const CREATED_SELECTIVE_QUESTION: ICreatedSelectiveQuestion = {
  id: null,
  type: 'SELECTIVE',
  content: '',
  necessity: true,
  wordLimit: null,
  minimumSelection: 1,
  maximumSelection: 1,
  choices: [
    {
      id: null,
      content: '',
    },
  ],
  order: -1,
};

export const CREATED_SECTION: ICreatedSection = {
  id: null,
  name: '',
  description: '',
  questions: [CREATED_SELECTIVE_QUESTION],
};

export const CREATED_CHOICE: ICreatedChoice = {
  id: null,
  content: '',
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
        '본 내용은 수정 가능합니다 ✅\n' +
        '\n' +
        '공통 섹션은 모든 지원자가 답하는 섹션이며 섹션 삭제 및 섹션명 수정이 불가합니다.\n' +
        '또한 섹션 내 이름, 학번, 전공 입력 문항은 원활한 서비스 진행을 위해 필수적인 문항으로 삭제 및 수정이 불가합니다 😣',
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
