import {
  ICreatedAnswer,
  IReadAnswer,
  IReadApplication,
  IReadNarrativeAnswer,
  IReadSelectiveAnswer,
} from '../../../../lib/types/models/i-application.ts';
import { ISection } from '../../../../lib/types/models/i-section.ts';
import { IFormAnswer, SHARED_SECTION_INDEX } from '../page';

// Convert ICreatedApplication to IFormApplication
export const convertAnswerToFormAnswer = (
  application: IReadApplication,
): IFormAnswer[] => {
  const convertedFormAnswers: IFormAnswer[] = application.answers.reduce(
    (acc: IFormAnswer[], answer: IReadAnswer) => {
      if (answer.type === 'NARRATIVE') {
        // NARRATIVE 타입의 답변 변환
        const narrativeAnswer: IFormAnswer = {
          answerId: answer.answerId,
          content: (answer as IReadNarrativeAnswer).content,
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
            (answer as IReadSelectiveAnswer).choiceId,
          );
        } else {
          const selectiveAnswer: IFormAnswer = {
            answerId: answer.answerId,
            content: null,
            choiceIds: [(answer as IReadSelectiveAnswer).choiceId],
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

/**
 * Filter answers related to selected or shared section
 * If selected section is undefined, filter only shared section
 * @param answers - answers to filter
 * @param selectedSection - selected section
 * @param sharedSection - shared section
 * @returns filtered answers
 */
export const filterSelectedAnswer = (
  answers: IFormAnswer[],
  selectedSection: ISection | undefined,
  sharedSection: ISection,
) => {
  if (!selectedSection) {
    // questionIds 추출
    const questionIds = [
      ...sharedSection.questions.map((question) => question.id),
    ];

    const filteredAnswers = answers.filter((answer) =>
      questionIds.includes(answer.questionId),
    );

    return filteredAnswers;
  }
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

/**
 * Check answer is related to selected or shared section
 * If selected section is undefined, check only shared section
 * @param answer - answer to check
 * @param selectedSection - selected section
 * @param sharedSection - shared section
 * @returns boolean
 */
export const checkSelectedAnswer = (
  answer: IFormAnswer,
  selectedSection: ISection | undefined,
  sharedSection: ISection,
) => {
  if (!selectedSection) {
    const questionIds = [
      ...sharedSection.questions.map((question) => question.id),
    ];

    return questionIds.includes(answer.questionId);
  }

  // questionIds 추출
  const questionIds = [
    ...selectedSection.questions.map((question) => question.id),
    ...sharedSection.questions.map((question) => question.id),
  ];

  return questionIds.includes(answer.questionId);
};

export const getInitialSectionSelection = (
  answers: IReadAnswer[] | undefined,
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

  if (nonSharedAnswers.length === 0) {
    return 1;
  }

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
