import { QuestionType } from '../enums';

export interface GetRecruitmentsReadyResponse {
  id: number;
  title: string;
  description: string;
  recruitmentProgress: string;
  sections: {
    id: number;
    name: string;
    description: string;
    questions: {
      id: number;
      type: 'SELECTIVE' | 'NARRATIVE';
      content: string;
      necessity: boolean;
      order: number;
      wordLimit: number | null;
      minimumSelection: number | null;
      maximumSelection: number | null;
      choices:
        | {
            id: number;
            content: string;
          }[]
        | null;
    }[];
  }[];
  deadline: string;
  code: string;
}

export interface PostRecruitmentsBody {
  id: number;
  title: string;
  description: string;
  recruitmentProgress: string;
  sections: {
    id: number | null;
    name: string;
    description: string;
    questions: {
      id: number | null;
      type: QuestionType;
      content: string;
      necessity: boolean;
      order: number;
      wordLimit: number | null;
      minimumSelection: number | null;
      maximumSelection: number | null;
      choices:
        | {
            id: number | null;
            content: string;
          }[]
        | null;
    }[];
  }[];
  deadline: string;
  code: string;
}
