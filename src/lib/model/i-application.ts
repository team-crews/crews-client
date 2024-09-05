export type IApplicationOverview = {
  id: number;
  studentNumber: string;
  name: string;
  major: string;
  outcome: 'PASS' | 'FAIL' | 'PENDING';
};

export type IApplication = Omit<IApplicationOverview, 'outcome'> & {
  answers: IAnswer[];
};

export type IAnswer = INarrativeAnswer | ISelectiveAnswer;

type IBaseAnswer = {
  answerId: number;
  questionId: number;
};

export type INarrativeAnswer = IBaseAnswer & {
  content: string;
  choiceId: null;
  questionType: 'NARRATIVE';
};

export type ISelectiveAnswer = IBaseAnswer & {
  content: null;
  choiceId: number;
  questionType: 'SELECTIVE';
};

type WithNullableAnswerId<T> = Omit<T, 'answerId'> & {
  answerId: number | null;
};

type ICreatedNarrativeAnswer = WithNullableAnswerId<INarrativeAnswer>;
type ICreatedSelectiveAnswer = WithNullableAnswerId<ISelectiveAnswer>;
type ICreatedAnswer = ICreatedNarrativeAnswer | ICreatedSelectiveAnswer;

export type ICreatedApplication = {
  id: number | null;
  studentNumber: string;
  major: string;
  name: string;
  answers: ICreatedAnswer[];
};

// ---------------------------------- Type Guards ----------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIApplicationOverview(obj: any): obj is IApplicationOverview {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.studentNumber === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.major === 'string' &&
    (obj.outcome === 'PASS' ||
      obj.outcome === 'FAIL' ||
      obj.outcome === 'PENDING')
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIBaseAnswer(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.answerId === 'number' &&
    typeof obj.questionId === 'number'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isICreatedBaseAnswer(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.answerId === null || typeof obj.answerId === 'number') &&
    typeof obj.questionId === 'number'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isINarrativeAnswer(obj: any): obj is INarrativeAnswer {
  return (
    isIBaseAnswer(obj) &&
    typeof obj.content === 'string' &&
    obj.choiceId === null &&
    obj.type === 'NARRATIVE'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isISelectiveAnswer(obj: any): obj is ISelectiveAnswer {
  return (
    isIBaseAnswer(obj) &&
    obj.content === null &&
    typeof obj.choiceId === 'number' &&
    obj.type === 'SELECTIVE'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isICreatedNarrativeAnswer(obj: any): obj is INarrativeAnswer {
  return (
    isICreatedBaseAnswer(obj) &&
    typeof obj.content === 'string' &&
    obj.choiceId === null &&
    obj.type === 'NARRATIVE'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isICreatedSelectiveAnswer(obj: any): obj is ISelectiveAnswer {
  return (
    isICreatedBaseAnswer(obj) &&
    obj.content === null &&
    typeof obj.choiceId === 'number' &&
    obj.type === 'SELECTIVE'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIAnswer(obj: any): obj is IAnswer {
  return isINarrativeAnswer(obj) || isISelectiveAnswer(obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isICreatedAnswer(obj: any): obj is IAnswer {
  return isICreatedNarrativeAnswer(obj) || isICreatedSelectiveAnswer(obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIApplication(obj: any): obj is IApplication {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.studentNumber === 'string' &&
    typeof obj.major === 'string' &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.answers) &&
    obj.answers.every(isIAnswer)
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isICreatedApplication(obj: any): obj is IApplication {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.studentNumber === 'string' &&
    typeof obj.major === 'string' &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.answers) &&
    obj.answers.every(isICreatedAnswer)
  );
}
