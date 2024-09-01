import { useFieldArray, useFormContext } from 'react-hook-form';
import Typography from '../../../../../components/shared/typography';

import XMarkIcon from '../../../../../assets/icons/x-mark.svg?react';
import PlusIcon from '../../../../../assets/icons/plus.svg?react';

interface ChoiceSectionProps {
  sectionIndex: number;
  questionIndex: number;
}

const DEFAULT_CHOICE = { id: null, content: '' };

const ChoiceSection = ({ sectionIndex, questionIndex }: ChoiceSectionProps) => {
  const { control, register } = useFormContext();

  const {
    fields: choiceFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions.${questionIndex}.choices`,
  });

  return (
    <section className="mt-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        {choiceFields.map((choice, choiceIndex) => (
          <div key={choice.id} className="flex items-center justify-between">
            <div className="flex items-center gap-[0.5rem]">
              <div className="h-[1.25rem] w-[1.25rem] rounded-full border-[1px] border-crews-g03" />
              <input
                className="text-[1rem]"
                {...register(
                  `sections.${sectionIndex}.questions.${questionIndex}.choices.${choiceIndex}.content`,
                )}
                placeholder="새로운 옵션"
              />
            </div>
            <XMarkIcon
              className="h-[0.875rem] w-[0.875rem] cursor-pointer text-crews-g03"
              onClick={() => removeChoice(choiceIndex)}
            />
          </div>
        ))}
      </div>
      <button
        className="mt-[1rem] flex items-center gap-[0.5rem]"
        type="button"
        onClick={() => appendChoice(DEFAULT_CHOICE)}
      >
        <PlusIcon className="h-[1rem] w-[1rem] cursor-pointer text-crews-g03" />
        <Typography className="text-crews-g05">옵션 추가</Typography>
      </button>
    </section>
  );
};

export default ChoiceSection;
