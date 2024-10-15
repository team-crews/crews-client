import { useFormContext } from 'react-hook-form';

import { IFormApplication } from '../page';
import { IChoice, IQuestion } from '../../../../lib/types/models/i-question.ts';

interface ApplyChoiceBoxProps {
  choice: IChoice;
  question: IQuestion;
  index: number;
  currentAnswerIndex: number;
  onErrorIndexChange: (index: number) => void;
}

const ApplyChoiceBox = ({
  choice,
  question,
  index,
  currentAnswerIndex,
  onErrorIndexChange,
}: ApplyChoiceBoxProps) => {
  const { getValues, register } = useFormContext<IFormApplication>();

  /**
   * Validate choice
   */
  const onChoiceValidationError = () => {
    const currentChoiceIds = getValues(
      `answers.${currentAnswerIndex}.choiceIds`,
    )?.filter((value) => value !== false);

    const necessityValidation =
      question.necessity &&
      (!currentChoiceIds || currentChoiceIds?.length === 0);

    const maximumSelectionValidation =
      question.maximumSelection &&
      currentChoiceIds &&
      currentChoiceIds.length > question.maximumSelection;

    const minimumSelectionValidation =
      question.minimumSelection &&
      currentChoiceIds &&
      currentChoiceIds.length < question.minimumSelection;

    onErrorIndexChange(index);

    if (necessityValidation) {
      return '해당 필드는 응답 필수입니다.';
    } else if (maximumSelectionValidation) {
      return `최대 ${question.maximumSelection}개 이하로 선택해주세요.`;
    } else if (minimumSelectionValidation) {
      return `최소 ${question.minimumSelection}개 이상 선택해주세요.`;
    }

    return true;
  };

  return (
    <div key={choice.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        {...register(`answers.${currentAnswerIndex}.choiceIds.${index}`, {
          validate: onChoiceValidationError,
        })}
        value={choice.id}
      />
      <div className="text-sm font-light text-crews-bk01">{choice.content}</div>
    </div>
  );
};

export default ApplyChoiceBox;
