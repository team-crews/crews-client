import { useFormContext } from 'react-hook-form';

import { IFormApplication } from '../page';
import { IChoice } from '../../../../lib/types/models/i-question.ts';

interface ApplyChoiceBoxProps {
  choice: IChoice;
  currentAnswerIndex: number;
}

const ApplyChoiceBox = ({
  choice,
  currentAnswerIndex,
}: ApplyChoiceBoxProps) => {
  const { getValues, setValue, clearErrors } =
    useFormContext<IFormApplication>();

  const handleChange = () => {
    const currentAnswers = getValues('answers');

    const currentChoiceIds = currentAnswers[currentAnswerIndex].choiceIds || [];

    const newChoiceIds = currentChoiceIds.includes(choice.id)
      ? currentChoiceIds.filter((id: number) => id !== choice.id)
      : [...currentChoiceIds, choice.id];

    setValue(`answers.${currentAnswerIndex}.choiceIds`, newChoiceIds);

    // if checkbox input value changes, clear error message
    clearErrors(`answers.${currentAnswerIndex}`);
  };

  return (
    <div key={choice.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={getValues(`answers.${currentAnswerIndex}.choiceIds`)?.includes(
          choice.id,
        )}
        onChange={handleChange}
      />
      <div className="text-sm font-light text-crews-bk01">{choice.content}</div>
    </div>
  );
};

export default ApplyChoiceBox;
