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

export type ICreatedNarrativeAnswer = WithNullableAnswerId<INarrativeAnswer>;
export type ICreatedSelectiveAnswer = WithNullableAnswerId<ISelectiveAnswer>;
export type ICreatedAnswer = ICreatedNarrativeAnswer | ICreatedSelectiveAnswer;

export type ICreatedApplication = {
  id: number | null;
  studentNumber: string;
  major: string;
  name: string;
  answers: ICreatedAnswer[];
};

//FIXME: 임시 type... 추후 수정 필요
export type ISaveApplicationRequest = ICreatedApplication & {
  recruitmentCode: string;
};

export type ITempNarrativeAnswer = IBaseAnswer & {
  content: string;
  choiceId: null;
  type: 'NARRATIVE';
};

export type ITempSelectiveAnswer = IBaseAnswer & {
  content: null;
  choiceId: number;
  type: 'SELECTIVE';
};

export type ITempAnswer = ITempNarrativeAnswer | ITempSelectiveAnswer;

export type ITempApplication = Omit<IApplicationOverview, 'outcome'> & {
  answers: ITempAnswer[];
};

export type ITempReadApplicationResponse = ITempApplication;
