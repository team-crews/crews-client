import { CreatedRecruitmentSchema } from './schemas/recruitment-schema.ts';
import { z } from 'zod';
import {
  CreatedChoiceSchema,
  CreatedNarrativeQuestionSchema,
  CreatedSelectiveQuestionSchema,
} from './schemas/question-schema.ts';
import { CreatedSectionSchema } from './schemas/section-schema.ts';
import {
  NarrativeAnswerSchema,
  SelectiveAnswerSchema,
} from './schemas/application-schema.ts';

export const CREATED_NARRATIVE_ANSWER = (
  questionId: number,
): z.infer<typeof NarrativeAnswerSchema> => {
  return {
    questionId,
    content: null,
    choiceIds: null,
    type: 'NARRATIVE',
  };
};

export const CREATED_SELECTIVE_ANSWER = (
  questionId: number,
): z.infer<typeof SelectiveAnswerSchema> => {
  return {
    questionId,
    content: null,
    choiceIds: [],
    type: 'SELECTIVE',
  };
};

export const CREATED_NARRATIVE_QUESTION: z.infer<
  typeof CreatedNarrativeQuestionSchema
> = {
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

export const CREATED_SELECTIVE_QUESTION: z.infer<
  typeof CreatedSelectiveQuestionSchema
> = {
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

export const CREATED_SECTION: z.infer<typeof CreatedSectionSchema> = {
  id: null,
  name: '',
  description: '',
  questions: [CREATED_SELECTIVE_QUESTION],
};

export const CREATED_CHOICE: z.infer<typeof CreatedChoiceSchema> = {
  id: null,
  content: '',
};

export const CREATED_RECRUITMENT: z.infer<typeof CreatedRecruitmentSchema> = {
  id: null,
  title: '',
  description: '',
  deadlineDate: '',
  deadlineTime: '',
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
