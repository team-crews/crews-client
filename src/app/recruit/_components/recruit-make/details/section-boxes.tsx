import { useFieldArray, useFormContext } from 'react-hook-form';

import XMarkIcon from '../../../../../assets/icons/x-mark-icon.svg?react';
import QuestionBoxes from './question-boxes.tsx';
import { isFilledInput } from '../../../../../lib/utils/validation.ts';
import { useToast } from '../../../../../hooks/use-toast.ts';
import { CREATED_SECTION } from '../../../../../lib/types/default-data.ts';
import { cn } from '../../../../../lib/utils/utils.ts';
import useAutosizeTextarea from '../../../../../hooks/use-autosize-textarea.ts';
import Container from '../../../../../components/shared/container.tsx';
import { z } from 'zod';
import { CreatedRecruitmentSchema } from '../../../../../lib/types/schemas/recruitment-schema.ts';

const SectionBox = ({
  sectionIndex,
  removeSection,
}: {
  sectionIndex: number;
  removeSection: (index: number) => void;
}) => {
  const { register, watch } =
    useFormContext<z.infer<typeof CreatedRecruitmentSchema>>();
  const value = watch(`sections.${sectionIndex}.description`);
  useAutosizeTextarea(`sections.${sectionIndex}.description`, value);

  return (
    <Container className="overflow-hidden rounded-xl">
      <div className="relative flex w-full flex-col gap-1 bg-crews-b04 p-4">
        <input
          autoComplete="off"
          maxLength={50}
          disabled={sectionIndex === 0}
          {...register(`sections.${sectionIndex}.name`, {
            validate: {
              validateIfFilled: (v) =>
                isFilledInput(v, '채워지지 않은 섹션명이 존재해요.'),
            },
          })}
          className="w-full bg-inherit text-base font-bold text-crews-w01 placeholder:text-crews-b02"
          placeholder="섹션명을 작성해주세요."
        />
        <XMarkIcon
          className={cn(
            'absolute right-4 top-4 h-4 w-4 cursor-pointer text-crews-w01',
            { hidden: sectionIndex === 0 },
          )}
          onClick={() => removeSection(sectionIndex)}
        />
        <textarea
          spellCheck={false}
          maxLength={250}
          rows={1}
          placeholder="섹션에 대한 설명을 작성해주세요."
          className="bg-inherit text-xs text-crews-w01 placeholder:text-crews-b02"
          {...register(`sections.${sectionIndex}.description`, {
            validate: {
              validateIfFilled: (v) =>
                isFilledInput(v, '채워지지 않은 섹션 설명이 존재해요.'),
            },
          })}
        />
      </div>

      <QuestionBoxes sectionIndex={sectionIndex} />
    </Container>
  );
};

const SectionBoxes = () => {
  const { control } =
    useFormContext<z.infer<typeof CreatedRecruitmentSchema>>();
  const { fields, remove, append } = useFieldArray({
    control: control,
    name: 'sections',
  });

  const { toast } = useToast();
  const appendSection = () => {
    if (fields.length <= 5) append(CREATED_SECTION);
    else
      toast({
        title: '섹션은 최대 5개 까지만 추가가능 합니다.',
        state: 'warning',
      });
  };

  return (
    <>
      {fields.map((section, sectionIndex) => (
        <SectionBox
          key={section.id}
          sectionIndex={sectionIndex}
          removeSection={remove}
        />
      ))}
      <button
        type="button"
        className="text-lg font-light text-crews-g04 underline underline-offset-[4px] hover:text-crews-g06"
        onClick={appendSection}
      >
        섹션 추가하기
      </button>
    </>
  );
};

export default SectionBoxes;
