import { PostRecruitmentsBody } from './types/recruitments';
import { ICreatedRecruitment, IRecruitment } from './model/i-recruitment.ts';

// FIXME: api 연동 후 삭제

export const formMockData = {
  id: 1,
  title: '우주최강동아리',
  description: '우주 최강만 들어오세요',
  recruitmentProgress: 'READY',
  sections: [
    {
      id: 1,
      name: 'FRONTEND',
      description: '프론트엔드만 대답하세용',
      questions: [
        {
          id: 1,
          type: 'SELECTIVE',
          content:
            '아주 긴 텍스트입니다. 아주 긴 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다.',
          necessity: true,
          order: 2,
          wordLimit: null,
          minimumSelection: 1,
          maximumSelection: 2,
          choices: [
            {
              id: 6,
              content: '꼼꼼함',
            },
            {
              id: 5,
              content: '밝음',
            },
            {
              id: 4,
              content: '성실함',
            },
          ],
        },
        {
          id: 2,
          type: 'NARRATIVE',
          content: '자기소개해주세요',
          necessity: true,
          order: 1,
          wordLimit: 100,
          minimumSelection: null,
          maximumSelection: null,
          choices: null,
        },
      ],
    },
    {
      id: 1,
      name: 'BACKEND',
      description: '백엔드만 대답하세용',
      questions: [
        {
          id: 3,
          type: 'SELECTIVE',
          content: '',
          necessity: true,
          order: 2,
          wordLimit: null,
          minimumSelection: 1,
          maximumSelection: 2,
          choices: [
            {
              id: 3,
              content: '꼼꼼함',
            },
            {
              id: 2,
              content: '밝음',
            },
            {
              id: 1,
              content: '성실함',
            },
          ],
        },
        {
          id: 4,
          type: 'NARRATIVE',
          content: '자기소개해주세요',
          necessity: true,
          order: 1,
          wordLimit: 100,
          minimumSelection: null,
          maximumSelection: null,
          choices: null,
        },
      ],
    },
  ],
  deadline: '2024-09-05T12:00',
  code: 'fbf0d84f-85c5-40d3-b2b5-48e109f5c9c7',
} as PostRecruitmentsBody;

export const RECRUITMENT_MOCK: IRecruitment = {
  id: 123,
  title: '소프트웨어 엔지니어 채용',
  description: '팀에 합류할 숙련된 소프트웨어 엔지니어를 찾고 있습니다.',
  recruitmentProgress: 'IN_PROGRESS',
  sections: [
    {
      id: 1,
      name: '기술 능력',
      description: '지원자의 기술 능력을 평가합니다.',
      questions: [
        {
          id: 101,
          content: '어떤 프로그래밍 언어에 능숙하십니까?',
          necessity: true,
          order: 1,
          type: 'SELECTIVE',
          wordLimit: null,
          minimumSelection: 1,
          maximumSelection: 3,
          choices: [
            { id: 1, content: 'JavaScript' },
            { id: 2, content: 'Python' },
            { id: 3, content: 'Java' },
            { id: 4, content: 'C++' },
          ],
        },
        {
          id: 102,
          content: '도전적인 프로젝트를 진행한 경험에 대해 설명해주세요.',
          necessity: true,
          order: 2,
          type: 'NARRATIVE',
          wordLimit: 500,
          minimumSelection: null,
          maximumSelection: null,
          choices: [],
        },
        {
          id: 102,
          content: '아무 말이나 해주세요.',
          necessity: false,
          order: 2,
          type: 'NARRATIVE',
          wordLimit: 400,
          minimumSelection: null,
          maximumSelection: null,
          choices: [],
        },
      ],
    },
    {
      id: 2,
      name: '행동 평가',
      description: '지원자의 행동 및 소프트 스킬을 평가합니다.',
      questions: [
        {
          id: 201,
          content: '스트레스 상황을 어떻게 처리하시나요?',
          necessity: false,
          order: 1,
          type: 'SELECTIVE',
          wordLimit: null,
          minimumSelection: 1,
          maximumSelection: 2,
          choices: [
            { id: 5, content: '침착하게 상황을 평가합니다.' },
            {
              id: 6,
              content: '잠시 휴식을 취하고 새로운 시각으로 다시 접근합니다.',
            },
          ],
        },
      ],
    },
  ],
  deadline: '2024-09-30',
  code: 'SE-2024-09',
};

export const CREATED_RECRUITMENT_MOCK: ICreatedRecruitment = {
  id: null,
  title: '변경된 모집 공고 제목',
  description: 'DESCRIPTION',
  deadline: '2024-09-05T12:00',
  sections: [
    {
      id: null,
      name: '변경된 섹션 이름',
      description: 'DESCRIPTION',
      questions: [
        {
          id: null,
          type: 'SELECTIVE',
          content: '변경된 질문 내용',
          necessity: true,
          order: 2,
          wordLimit: null,
          minimumSelection: 1,
          maximumSelection: 2,
          choices: [
            {
              id: null,
              content: '변경된 선택지 내용',
            },
          ],
        },
      ],
    },
    {
      id: null,
      name: '새로운 섹션 이름',
      description: 'DESCRIPTION',
      questions: [
        {
          id: null,
          type: 'NARRATIVE',
          content: '자기소개해주세요',
          necessity: true,
          order: 1,
          wordLimit: 100,
          minimumSelection: null,
          maximumSelection: null,
          choices: [],
        },
        {
          id: null,
          type: 'SELECTIVE',
          content: '장점을 골라주세요',
          necessity: true,
          order: 2,
          wordLimit: null,
          minimumSelection: 1,
          maximumSelection: 2,
          choices: [
            {
              id: null,
              content: '성실함',
            },
            {
              id: null,
              content: '밝음',
            },
            {
              id: null,
              content: '꼼꼼함',
            },
          ],
        },
      ],
    },
  ],
};
