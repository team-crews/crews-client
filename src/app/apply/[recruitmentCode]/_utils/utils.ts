import {
  ICreatedAnswer,
  ITempAnswer,
  ITempApplication,
  ITempNarrativeAnswer,
  ITempSelectiveAnswer,
} from '../../../../lib/model/i-application';
import { ISection } from '../../../../lib/model/i-section';
import { IFormAnswer, SHARED_SECTION_INDEX } from '../page';

// Convert ICreatedApplication to IFormApplication
export const convertAnswerToFormAnswer = (
  application: ITempApplication,
): IFormAnswer[] => {
  const convertedFormAnswers: IFormAnswer[] = application.answers.reduce(
    (acc: IFormAnswer[], answer: ITempAnswer) => {
      if (answer.type === 'NARRATIVE') {
        // NARRATIVE 타입의 답변 변환
        const narrativeAnswer: IFormAnswer = {
          answerId: answer.answerId,
          content: (answer as ITempNarrativeAnswer).content,
          choiceIds: null,
          questionId: answer.questionId,
          questionType: 'NARRATIVE',
        };
        acc.push(narrativeAnswer);
      } else if (answer.type === 'SELECTIVE') {
        const selectiveAnswerIndex = acc.findIndex(
          (fa) =>
            fa.questionId === answer.questionId &&
            fa.questionType === 'SELECTIVE',
        );

        if (selectiveAnswerIndex !== -1) {
          acc[selectiveAnswerIndex].choiceIds?.push(
            (answer as ITempSelectiveAnswer).choiceId,
          );
        } else {
          const selectiveAnswer: IFormAnswer = {
            answerId: answer.answerId,
            content: null,
            choiceIds: [(answer as ITempSelectiveAnswer).choiceId],
            questionId: answer.questionId,
            questionType: 'SELECTIVE',
          };
          acc.push(selectiveAnswer);
        }
      }
      return acc;
    },
    [] as IFormAnswer[],
  );

  return convertedFormAnswers;
};

export const convertFormAnswerToAnswer = (answers: IFormAnswer[]) => {
  const convertedAnswers = answers.flatMap((answer) => {
    if (answer.questionType === 'NARRATIVE') {
      return [
        {
          answerId: null,
          questionId: answer.questionId,
          content: answer.content,
          choiceId: null,
          questionType: 'NARRATIVE',
        } as ICreatedAnswer,
      ];
    } else if (answer.questionType === 'SELECTIVE') {
      return (
        answer.choiceIds?.map(
          (choiceId) =>
            ({
              answerId: null,
              questionId: answer.questionId,
              content: null,
              choiceId: choiceId,
              questionType: 'SELECTIVE',
            }) as ICreatedAnswer,
        ) || []
      );
    }
    return [];
  });

  return convertedAnswers;
};

export const filterSelectedAnswer = (
  answers: IFormAnswer[],
  selectedSection: ISection,
  sharedSection: ISection,
) => {
  // questionIds 추출
  const questionIds = [
    ...selectedSection.questions.map((question) => question.id),
    ...sharedSection.questions.map((question) => question.id),
  ];

  const filteredAnswers = answers.filter((answer) =>
    questionIds.includes(answer.questionId),
  );

  return filteredAnswers;
};

export const checkSelectedAnswer = (
  answer: IFormAnswer,
  selectedSection: ISection,
  sharedSection: ISection,
) => {
  // questionIds 추출
  const questionIds = [
    ...selectedSection.questions.map((question) => question.id),
    ...sharedSection.questions.map((question) => question.id),
  ];

  return questionIds.includes(answer.questionId);
};

export const getInitialSectionSelection = (
  answers: ITempAnswer[] | undefined,
  sections: ISection[] | undefined,
  sharedSection: ISection | undefined,
) => {
  if (!answers || !sections) return 1;

  const sharedQuestionIds =
    sharedSection?.questions.map((question) => question.id) || [];

  let initialSectionSelection: number = 1;

  // answer중 sharedSection이 아닌 첫번쨰 questionId 추출, 공통 섹션만 있을 경우 1번째 섹션 선택
  const nonSharedAnswers = answers.filter((answer) => {
    if (sharedQuestionIds.includes(answer.questionId)) {
      return false;
    }
    return true;
  });

  const questionId = nonSharedAnswers[0].questionId;

  sections.forEach((section, index) => {
    if (index === SHARED_SECTION_INDEX) return;

    const questionIds = section.questions.map((question) => question.id);

    if (questionIds.includes(questionId)) {
      initialSectionSelection = index;
      return;
    }
  });

  return initialSectionSelection;
};
