import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form';

import XMarkIcon from '../../../../../assets/icons/x-mark.svg?react';
import QuestionBoxes from './question-boxes.tsx';
import { Button } from '../../../../../components/shadcn/button.tsx';
import { ICreatedRecruitment } from '../../../../../lib/types/models/i-recruitment.ts';
import { useEffect } from 'react';
import { isFilledInput } from '../../../../../lib/utils/validation.ts';
import { useToast } from '../../../../../hooks/use-toast.ts';
import { CREATED_SELECTIVE_QUESTION } from '../../../../../lib/types/default-data.ts';
import { ICreatedSection } from '../../../../../lib/types/models/i-section.ts';

const SectionBox = ({
  sectionIndex,
  removeSection,
}: {
  sectionIndex: number;
  removeSection: (index: number) => void;
}) => {
  const { control, register, watch } = useFormContext<ICreatedRecruitment>();
  const untouchable = sectionIndex === 0;

  const {
    fields: questionFields,
    append,
    remove: removeQuestion,
    update,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions`,
  });

  const value = watch(`sections.${sectionIndex}.description`);
  useEffect(() => {
    const textarea = document.querySelector(
      `textarea[name="sections.${sectionIndex}.description"]`,
    ) as HTMLTextAreaElement;

    if (textarea) {
      textarea.style.height = 'auto';

      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
    }
  }, [sectionIndex, value]);

  const { toast } = useToast();
  const appendQuestion = () => {
    if (questionFields.length === 10) {
      toast({
        title: '질문은 섹션당 최대 10개 까지만 추가가능 합니다.',
        state: 'warning',
      });
      return;
    }
    append(CREATED_SELECTIVE_QUESTION);
  };

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="relative flex w-full flex-col gap-1 bg-crews-b04 p-4">
        <input
          autoComplete="off"
          maxLength={50}
          disabled={untouchable}
          {...register(`sections.${sectionIndex}.name`, {
            validate: {
              isFilledInput: (v) =>
                isFilledInput(v, '채워지지 않은 섹션명이 존재해요.'),
            },
          })}
          className="w-full bg-inherit text-base font-bold text-crews-w01 placeholder:text-crews-b02"
          placeholder="섹션명을 작성해주세요."
        />
        {untouchable || (
          <XMarkIcon
            className="absolute right-4 top-4 h-4 w-4 cursor-pointer text-crews-w01"
            onClick={() => removeSection(sectionIndex)}
          />
        )}
        <textarea
          spellCheck={false}
          maxLength={250}
          rows={1}
          {...register(`sections.${sectionIndex}.description`, {
            validate: {
              isFilledInput: (v) =>
                isFilledInput(v, '채워지지 않은 섹션 설명이 존재해요.'),
            },
          })}
          className="bg-inherit text-xs text-crews-w01 placeholder:text-crews-b02"
          placeholder="섹션에 대한 설명을 작성해주세요."
        />
      </div>

      <div className="flex w-full flex-col gap-4 bg-crews-b01 p-4">
        <QuestionBoxes
          questionFields={questionFields}
          sectionIndex={sectionIndex}
          removeQuestion={removeQuestion}
          update={update}
        />

        <Button
          type="button"
          className="ml-auto h-6 w-6 bg-crews-b04 text-center text-sm font-semibold"
          onClick={appendQuestion}
        >
          +
        </Button>
      </div>
    </div>
  );
};

const SectionBoxes = ({
  sectionFields,
  removeSection,
}: {
  sectionFields: ICreatedSection[];
  removeSection: UseFieldArrayRemove;
}) => {
  return sectionFields.map((section, sectionIndex) => {
    return (
      <SectionBox
        key={section.id}
        sectionIndex={sectionIndex}
        removeSection={removeSection}
      />
    );
  });
};

export default SectionBoxes;
