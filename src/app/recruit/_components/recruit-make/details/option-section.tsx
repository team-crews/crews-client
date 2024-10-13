import { useFormContext } from 'react-hook-form';
import LimitedNumberInput from './limited-number-input.tsx';
import { Switch } from '../../../../../components/shadcn/switch.tsx';
import { QuestionType } from '../../../../../lib/enums.ts';
import React from 'react';
import { z } from 'zod';
import { CreatedRecruitmentSchema } from '../../../../../lib/types/schemas/recruitment-schema.ts';

type OptionSectionProps = {
  sectionIndex: number;
  questionIndex: number;
};

const MAX_SELECTION_LENGTH = 2;
const MAX_WORD_LIMIT_LENGTH = 4;

const OptionSection = ({ sectionIndex, questionIndex }: OptionSectionProps) => {
  const { watch, setValue } =
    useFormContext<z.infer<typeof CreatedRecruitmentSchema>>();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  return (
    <section className="mt-3 flex w-full items-center justify-end gap-3">
      {questionType === QuestionType.SELECTIVE && (
        <div className="flex items-center gap-3">
          <OptionChunk>
            <Label>최소 선택</Label>
            <LimitedNumberInput
              type={questionType}
              name={`sections.${sectionIndex}.questions.${questionIndex}.minimumSelection`}
              maxLength={MAX_SELECTION_LENGTH}
            />
          </OptionChunk>

          <OptionChunk>
            <Label>최대 선택</Label>
            <LimitedNumberInput
              type={questionType}
              name={`sections.${sectionIndex}.questions.${questionIndex}.maximumSelection`}
              maxLength={MAX_SELECTION_LENGTH}
            />
          </OptionChunk>
        </div>
      )}

      {questionType === QuestionType.NARRATIVE && (
        <OptionChunk>
          <Label>글자 수 제한</Label>
          <LimitedNumberInput
            type={questionType}
            name={`sections.${sectionIndex}.questions.${questionIndex}.wordLimit`}
            maxLength={MAX_WORD_LIMIT_LENGTH}
          />
          <Label>자</Label>
        </OptionChunk>
      )}

      <OptionChunk>
        <Label>응답 필수</Label>
        <Switch
          checked={watch(
            `sections.${sectionIndex}.questions.${questionIndex}.necessity`,
          )}
          onCheckedChange={(value) => {
            setValue(
              `sections.${sectionIndex}.questions.${questionIndex}.necessity`,
              value,
            );
          }}
        />
      </OptionChunk>
    </section>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-xs text-crews-g06">{children}</p>;
};

const OptionChunk = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-1">{children}</div>;
};

export default OptionSection;
