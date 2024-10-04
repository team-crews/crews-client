import { useFieldArray, useFormContext } from 'react-hook-form';

import XMarkIcon from '../../../../../assets/icons/x-mark.svg?react';
import PlusIcon from '../../../../../assets/icons/plus.svg?react';
import Typography from '../../../../../components/shared/typography.tsx';
import Separator from '../../../../../components/shadcn/seperator.tsx';
import { useToast } from '../../../../../hooks/use-toast.ts';
import { isFilledInput } from '../../../../../lib/utils/validation.ts';
import { useState } from 'react';

import { CREATED_CHOICE } from '../../../../../lib/types/default-data.ts';

const ChoiceSection = ({
  sectionIndex,
  questionIndex,
}: {
  sectionIndex: number;
  questionIndex: number;
}) => {
  const { control, register } = useFormContext();

  const {
    fields: choiceFields,
    append,
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

  const appendChoice = () => {
    if (choiceFields.length === 10) {
      toast({
        title: '옵션은 질문당 최대 10개 까지만 추가가능 합니다.',
        state: 'warning',
      });
      return;
    }
    append(CREATED_CHOICE);
  };

  const [isComposing, setIsComposing] = useState<boolean>(false);

  return (
    <section className="mt-3">
      <div className="flex flex-col gap-2">
        {choiceFields.map((choice, choiceIndex) => (
          <div key={choice.id} className="flex items-center justify-between">
            <div className="flex w-full items-center gap-2">
              <div className="h-3 w-3 rounded-full border border-crews-g03" />
              <input
                maxLength={50}
                autoComplete="off"
                onKeyDown={(e) => {
                  if (!isComposing && e.key === 'Enter') appendChoice();
                }}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                className="w-full text-sm font-light text-crews-bk01 placeholder:text-crews-g03"
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
        onClick={appendChoice}
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
