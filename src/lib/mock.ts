import { PostRecruitmentsBody } from './types';

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
          content: '장점을 골라주세요',
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
          content: '장점을 골라주세요',
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
  deadline: '2030-09-05T18:00:00',
  code: 'fbf0d84f-85c5-40d3-b2b5-48e109f5c9c7',
} as PostRecruitmentsBody;
