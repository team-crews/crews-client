import { ICreatedQuestion, IQuestion } from './i-question.ts';
import { WithNullableId } from './i-nullable-id.ts';

export type ISection = {
  id: number;
  name: string;
  description: string;
  questions: IQuestion[];
};

export type ICreatedSection = Omit<WithNullableId<ISection>, 'questions'> & {
  questions: ICreatedQuestion[];
};
