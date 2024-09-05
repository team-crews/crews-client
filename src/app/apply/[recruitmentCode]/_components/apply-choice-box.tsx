import { useFormContext } from 'react-hook-form';
import { ICreatedApplication } from '../../../../lib/model/i-application';
import { IChoice, IQuestion } from '../../../../lib/model/i-section';

interface ApplyChoiceBoxProps {
  choice: IChoice;
  question: IQuestion;
  handleChoiceError: (message: string | null) => void;
}

const ApplyChoiceBox = ({
  choice,
  question,
  handleChoiceError,
}: ApplyChoiceBoxProps) => {
  const { watch, setValue } = useFormContext<ICreatedApplication>();

  const currentAnswers = watch('answers');

  const currentAnswerIndex = watch('answers').findIndex(
    (answer) =>
      answer.questionId === question.id && answer.choiceId === choice.id,
  );

  const selectedAnswersForQuestion = currentAnswers.filter(
    (answer) => answer.questionId === question.id,
  );

  const handleCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      if (
        question.maximumSelection &&
        selectedAnswersForQuestion.length >= question.maximumSelection
      ) {
        handleChoiceError(
          `최대 ${question.maximumSelection}개까지 선택할 수 있습니다.`,
        );
      } else {
        handleChoiceError(null);
      }

      setValue('answers', [
        ...currentAnswers,
        {
          answerId: null,
          questionId: question.id,
          content: null,
          choiceId: choice.id,
          questionType: 'SELECTIVE',
        },
      ]);
    } else {
      if (
        question.minimumSelection &&
        selectedAnswersForQuestion.length <= question.minimumSelection
      ) {
        handleChoiceError(
          `최소 ${question.minimumSelection}개 이상 선택해야 합니다.`,
        );
      } else {
        handleChoiceError(null);
      }

      const updatedAnswers = [
        ...currentAnswers.slice(0, currentAnswerIndex),
        ...currentAnswers.slice(currentAnswerIndex + 1),
      ];
      setValue('answers', updatedAnswers);
    }
  };

  return (
    <div key={choice.id} className="flex items-center gap-[0.5rem]">
      <input
        type="checkbox"
        checked={currentAnswerIndex !== -1}
        onChange={(e) => handleCheckboxChange(e.target.checked)}
      />
      <div className="text-[0.875rem] text-crews-bk01">{choice.content}</div>
    </div>
  );
};

export default ApplyChoiceBox;
