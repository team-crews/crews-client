import { ICreatedQuestion } from './i-question.ts';
import { WithNullableId } from './i-nullable-id.ts';
import { z } from 'zod';
import { SectionSchema } from '../schemas/section-schema.ts';

// export type ISection = {
//   id: number;
//   name: string;
//   description: string;
//   questions: IQuestion[];
// };

export type ISection = z.infer<typeof SectionSchema>;

export type ICreatedSection = Omit<WithNullableId<ISection>, 'questions'> & {
  questions: ICreatedQuestion[];
};
