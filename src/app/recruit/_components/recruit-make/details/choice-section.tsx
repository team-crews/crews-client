import { useFieldArray, useFormContext } from 'react-hook-form';

import XMarkIcon from '../../../../../assets/icons/x-mark-icon.svg?react';
import PlusIcon from '../../../../../assets/icons/plus-icon.svg?react';
import Separator from '../../../../../components/shadcn/seperator.tsx';
import { useToast } from '../../../../../hooks/use-toast.ts';
import { isFilledInput } from '../../../../../lib/utils/validation.ts';

import { CREATED_CHOICE } from '../../../../../lib/types/default-data.ts';
import { z } from 'zod';
import { CreatedRecruitmentSchema } from '../../../../../lib/types/schemas/recruitment-schema.ts';

const ChoiceSection = ({
  sectionIndex,
  questionIndex,
}: {
  sectionIndex: number;
  questionIndex: number;
}) => {
  const { control, register } =
    useFormContext<z.infer<typeof CreatedRecruitmentSchema>>();

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
    if (choiceFields.length > 1) removeChoice(choiceIndex);
    else
      toast({
        title: '선택형 질문은 반드시 하나의 선택지를 포함해야 합니다.',
        state: 'warning',
      });
  };

  const appendChoice = () => {
    if (choiceFields.length < 10) append(CREATED_CHOICE);
    else
      toast({
        title: '옵션은 질문당 최대 10개 까지만 추가가능 합니다.',
        state: 'warning',
      });
  };

  return (
    <section className="mt-3 flex flex-col gap-2">
      {choiceFields.map((choice, choiceIndex) => (
        <div
          key={choice.id}
          className="flex items-center justify-between gap-2"
        >
          <div className="h-3 w-3 rounded-full border border-crews-g03" />
          <input
            maxLength={50}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
              appendChoice();
            }}
            className="w-full text-sm font-light text-crews-bk01 placeholder:text-crews-g03"
            placeholder="옵션을 작성해주세요."
            {...register(
              `sections.${sectionIndex}.questions.${questionIndex}.choices.${choiceIndex}.content`,
              {
                validate: {
                  validateIfFilled: (v) =>
                    isFilledInput(v, '채워지지 않은 선택지가 존재해요.'),
                },
              },
            )}
          />
          <XMarkIcon
            className="h-3 w-3 cursor-pointer text-crews-g03"
            onClick={() => handleRemoveClick(choiceIndex)}
          />
        </div>
      ))}
      <button
        className="flex items-center gap-1"
        type="button"
        onClick={appendChoice}
      >
        <PlusIcon className="h-3 w-3 cursor-pointer text-crews-g05" />
        <p className="text-xs font-light text-crews-g05">옵션 추가</p>
      </button>
      <Separator className="bg-crews-g02" orientation="horizontal" />
    </section>
  );
};

export default ChoiceSection;
