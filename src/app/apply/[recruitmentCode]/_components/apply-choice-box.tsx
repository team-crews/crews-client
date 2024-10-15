import { useFormContext } from 'react-hook-form';

import { IFormApplication } from '../page';
import { IChoice } from '../../../../lib/types/models/i-question.ts';

interface ApplyChoiceBoxProps {
  choice: IChoice;
  index: number;
  currentAnswerIndex: number;
  onCoiceValidationError: (index: number) => void;
}

const ApplyChoiceBox = ({
  choice,
  index,
  currentAnswerIndex,
  onCoiceValidationError,
}: ApplyChoiceBoxProps) => {
  const { getValues, setValue, clearErrors, register } =
    useFormContext<IFormApplication>();

  // const handleChange = () => {
  //   const currentAnswers = getValues('answers');

  //   const currentChoiceIds = currentAnswers[currentAnswerIndex].choiceIds || [];

  //   const newChoiceIds = currentChoiceIds.includes(choice.id)
  //     ? currentChoiceIds.filter((id: number) => id !== choice.id)
  //     : [...currentChoiceIds, choice.id];

  //   setValue(`answers.${currentAnswerIndex}.choiceIds`, newChoiceIds);

  //   // if checkbox input value changes, clear error message
  //   clearErrors(`answers.${currentAnswerIndex}`);
  // };

  const onChoiceValidationError = (value: boolean | number) => {
    const currentChoiceIds = getValues(
      `answers.${currentAnswerIndex}.choiceIds`,
    )?.filter((value) => value !== false);

    if (!currentChoiceIds || (currentChoiceIds.length === 0 && !value)) {
      onCoiceValidationError(index);

      return '선택지를 선택해주세요.';
    }
    // return true;
  };

  return (
    <div key={choice.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        // checked={getValues(`answers.${currentAnswerIndex}.choiceIds`)?.includes(
        //   choice.id,
        // )}
        // onChange={handleChange}
        {...register(`answers.${currentAnswerIndex}.choiceIds.${index}`, {
          validate: (value) => onChoiceValidationError(value),
        })}
        value={choice.id}
      />
      <div className="text-sm font-light text-crews-bk01">{choice.content}</div>
    </div>
  );
};

export default ApplyChoiceBox;
