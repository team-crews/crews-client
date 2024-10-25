import { z } from 'zod';
import { SectionSchema } from '../schemas/section-schema.ts';

// export type ISection = {
//   id: number;
//   name: string;
//   description: string;
//   questions: IQuestion[];
// };

export type ISection = z.infer<typeof SectionSchema>;
