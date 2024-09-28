import { WithNullableId } from './i-nullable-id.ts';

type IBaseQuestion = {
  id: number;
  content: string;
  necessity: boolean;
  order: number;
};

export type ISelectiveQuestion = IBaseQuestion & {
  type: 'SELECTIVE';
  wordLimit: null;
  minimumSelection: number;
  maximumSelection: number;
  choices: IChoice[];
};
export type ICreatedSelectiveQuestion = Omit<
  WithNullableId<ISelectiveQuestion>,
  'choices'
> & {
  choices: ICreatedChoice[];
};

export type INarrativeQuestion = IBaseQuestion & {
  type: 'NARRATIVE';
  wordLimit: number;
  minimumSelection: null;
  maximumSelection: null;
  choices: [];
};
export type ICreatedNarrativeQuestion = WithNullableId<INarrativeQuestion>;

export type IQuestion = ISelectiveQuestion | INarrativeQuestion;
export type ICreatedQuestion =
  | ICreatedSelectiveQuestion
  | ICreatedNarrativeQuestion;

export type IChoice = {
  id: number;
  content: string;
};
export type ICreatedChoice = WithNullableId<IChoice>;
