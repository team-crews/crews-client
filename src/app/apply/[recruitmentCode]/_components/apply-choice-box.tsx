import { useFormContext } from 'react-hook-form';

import { IChoice, IQuestion } from '../../../../lib/types/models/i-question.ts';
import { IFormApplication } from '../page.tsx';

interface ApplyChoiceBoxProps {
  choice: IChoice;
  question: IQuestion;
  choiceIndex: number;
  questionIndex: number;
  sectionIndex: number;
  onErrorIndexChange: (index: number) => void;
}

const ApplyChoiceBox = ({
  choice,
  question,
  choiceIndex,
  questionIndex,
  sectionIndex,
  onErrorIndexChange,
}: ApplyChoiceBoxProps) => {
  const { getValues, register } = useFormContext<IFormApplication>();

  /**
   * Validate choice
   */
  const onChoiceValidationError = () => {
    const currentChoiceIds = getValues(
      `sections.${sectionIndex}.answers.${questionIndex}.choiceIds`,
    )?.filter((value) => value !== false);

    const choiceLength = currentChoiceIds?.length;

    // 필수가 아니고, 선택이 없는 경우에는 선택 개수 valid check를 하지 않는다.
    const shouldSkipValidation =
      !question.necessity && (!currentChoiceIds || choiceLength === 0);

    const necessityValidation =
      question.necessity && (!currentChoiceIds || choiceLength === 0);

    const maximumSelectionValidation =
      question.maximumSelection &&
      currentChoiceIds &&
      currentChoiceIds.length > question.maximumSelection;

    const minimumSelectionValidation =
      question.minimumSelection &&
      currentChoiceIds &&
      currentChoiceIds.length < question.minimumSelection;

    onErrorIndexChange(choiceIndex);

    if (necessityValidation) {
      return '해당 필드는 응답 필수입니다.';
    } else if (!shouldSkipValidation) {
      if (maximumSelectionValidation) {
        return `최대 ${question.maximumSelection}개 이하로 선택해주세요.`;
      } else if (minimumSelectionValidation) {
        return `최소 ${question.minimumSelection}개 이상 선택해주세요.`;
      }
    }

    return true;
  };

  return (
    <div key={choice.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        {...register(
          `sections.${sectionIndex}.answers.${questionIndex}.choiceIds.${choiceIndex}`,
          {
            validate: onChoiceValidationError,
          },
        )}
        value={choice.id}
      />
      <div className="text-sm font-light text-crews-bk01">{choice.content}</div>
    </div>
  );
};

export default ApplyChoiceBox;
