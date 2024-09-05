import { useFieldArray, useFormContext } from 'react-hook-form';

import XMarkIcon from '../../../../../assets/icons/x-mark.svg?react';
import PlusIcon from '../../../../../assets/icons/plus.svg?react';
import Typography from '../../../../../components/shared/typography.tsx';
import Separator from '../../../../../components/shared/seperator.tsx';
import { useToast } from '../../../../../hooks/use-toast.ts';
import { isFilledInput } from '../../../../../lib/utils/validation.ts';

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

  const { toast } = useToast();
  const handleRemoveClick = (choiceIndex: number) => {
    if (choiceFields.length === 1) {
      toast({
        title: '선택형 질문은 반드시 하나의 선택지를 포함해야 합니다.',
        state: 'warning',
      });
      return;
    }
    removeChoice(choiceIndex);
  };

  return (
    <section className="mt-3">
      <div className="flex flex-col gap-2">
        {choiceFields.map((choice, choiceIndex) => (
          <div key={choice.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border border-crews-g03" />
              <input
                className="text-sm font-light text-crews-bk01 placeholder:text-crews-g03"
                {...register(
                  `sections.${sectionIndex}.questions.${questionIndex}.choices.${choiceIndex}.content`,
                  {
                    validate: {
                      isFilledInput: (v) =>
                        isFilledInput(v, '채워지지 않은 선택지가 존재해요.'),
                    },
                  },
                )}
                placeholder="옵션을 작성해주세요."
              />
            </div>
            <XMarkIcon
              className="h-3 w-3 cursor-pointer text-crews-g03"
              onClick={() => handleRemoveClick(choiceIndex)}
            />
          </div>
        ))}
      </div>
      <button
        className="mt-3 flex items-center gap-1"
        type="button"
        onClick={() => appendChoice(DEFAULT_CHOICE)}
      >
        <PlusIcon className="h-3 w-3 cursor-pointer text-crews-g05" />
        <Typography className="text-xs font-light text-crews-g05">
          옵션 추가
        </Typography>
      </button>
      <Separator className="mt-3 bg-crews-g02" orientation="horizontal" />
    </section>
  );
};

export default ChoiceSection;
