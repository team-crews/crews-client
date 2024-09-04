type IBaseQuestion = {
  id: number;
  content: string;
  necessity: boolean;
  order: number;
};

type IChoice = {
  id: number;
  content: string;
};

export type ISelectiveQuestion = IBaseQuestion & {
  type: 'SELECTIVE';
  wordLimit: null;
  minimumSelection: number;
  maximumSelection: number;
  choices: IChoice[];
};

export type INarrativeQuestion = IBaseQuestion & {
  type: 'NARRATIVE';
  wordLimit: number;
  minimumSelection: null;
  maximumSelection: null;
  choices: [];
};

export type IQuestion = ISelectiveQuestion | INarrativeQuestion;

export type ISection = {
  id: number;
  name: string;
  description: string;
  questions: IQuestion[];
};

export type WithNullableId<T> = Omit<T, 'id'> & { id: number | null };

type ICreatedChoice = WithNullableId<IChoice>;
type ICreatedSelectiveQuestion = Omit<
  WithNullableId<ISelectiveQuestion>,
  'choices'
> & {
  choices: ICreatedChoice[];
};
type ICreatedNarrativeQuestion = WithNullableId<INarrativeQuestion>;
export type ICreatedQuestion =
  | ICreatedSelectiveQuestion
  | ICreatedNarrativeQuestion;

export type ICreatedSection = Omit<WithNullableId<ISection>, 'questions'> & {
  questions: ICreatedQuestion[];
};

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

// ---------------------------------- Type Guards ----------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIBaseQuestion(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.content === 'string' &&
    typeof obj.necessity === 'boolean' &&
    typeof obj.order === 'number'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIChoice(obj: any): obj is IChoice {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.content === 'string'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isISelectiveQuestion(obj: any): obj is ISelectiveQuestion {
  return (
    isIBaseQuestion(obj) &&
    obj.type === 'SELECTIVE' &&
    obj.wordLimit === null &&
    typeof obj.minimumSelection === 'number' &&
    typeof obj.maximumSelection === 'number' &&
    Array.isArray(obj.choices) &&
    obj.choices.every(isIChoice)
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isINarrativeQuestion(obj: any): obj is INarrativeQuestion {
  return (
    isIBaseQuestion(obj) &&
    obj.type === 'NARRATIVE' &&
    typeof obj.wordLimit === 'number' &&
    obj.minimumSelection === null &&
    obj.maximumSelection === null &&
    Array.isArray(obj.choices) &&
    obj.choices.length === 0
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIQuestion(obj: any): obj is IQuestion {
  return isISelectiveQuestion(obj) || isINarrativeQuestion(obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isISection(obj: any): obj is ISection {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.questions) &&
    obj.questions.every(isIQuestion)
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isICreatedChoice(obj: any): obj is ICreatedChoice {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.content === 'string'
  );
}

function isICreatedSelectiveQuestion(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is ICreatedSelectiveQuestion {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.content === 'string' &&
    typeof obj.necessity === 'boolean' &&
    typeof obj.order === 'number' &&
    obj.type === 'SELECTIVE' &&
    obj.wordLimit === null &&
    typeof obj.minimumSelection === 'number' &&
    typeof obj.maximumSelection === 'number' &&
    Array.isArray(obj.choices) &&
    obj.choices.every(isICreatedChoice)
  );
}

function isICreatedNarrativeQuestion(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is ICreatedNarrativeQuestion {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.content === 'string' &&
    typeof obj.necessity === 'boolean' &&
    typeof obj.order === 'number' &&
    obj.type === 'NARRATIVE' &&
    typeof obj.wordLimit === 'number' &&
    obj.minimumSelection === null &&
    obj.maximumSelection === null &&
    Array.isArray(obj.choices) &&
    obj.choices.length === 0
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isICreatedQuestion(obj: any): obj is ICreatedQuestion {
  return isICreatedSelectiveQuestion(obj) || isICreatedNarrativeQuestion(obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isICreatedSection(obj: any): obj is ICreatedSection {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.questions) &&
    obj.questions.every(isICreatedQuestion)
  );
}
