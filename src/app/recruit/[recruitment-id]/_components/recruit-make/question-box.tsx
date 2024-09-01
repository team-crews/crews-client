import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import CheckIcon from '../../../../../assets/icons/circle-check-icon.svg?react';
import TextIcon from '../../../../../assets/icons/text.svg?react';
import XMarkIcon from '../../../../../assets/icons/x-mark.svg?react';

import { cn } from '../../../../../lib/utils';
import { QuestionType } from '../../../../../lib/enums';
import { Switch } from '../../../../../components/ui/switch';
import Typography from '../../../../../components/shared/typography';
import Container from '../../../../../components/shared/container';
import QuestionTextarea from './question-textarea';
import WordLimitInput from './word-limit-input';
import ChoiceSection from './\bchoice-section';

interface QuestionBoxProps {
  sectionIndex: number;
  questionIndex: number;
  removeQuestion: UseFieldArrayRemove;
}

const QuestionBox = ({
  sectionIndex,
  questionIndex,
  removeQuestion,
}: QuestionBoxProps) => {
  const { register, watch, setValue } = useFormContext();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  const handleTypeClick = (type: QuestionType) => {
    setValue(`sections.${sectionIndex}.questions.${questionIndex}.type`, type);
  };

  return (
    <Container>
      <div className="flex w-fit items-center gap-[0.5rem] rounded-t-[0.625rem] border-l-[1px] border-r-[1px] border-t-[1px] border-crews-g02 bg-crews-w01 p-[0.75rem]">
        <CheckIcon
          className={cn('w-[1.25rem] cursor-pointer', {
            'text-crews-b05': questionType === QuestionType.SELECTIVE,
            'text-crews-g06': questionType !== QuestionType.SELECTIVE,
          })}
          onClick={() => {
            handleTypeClick(QuestionType.SELECTIVE);
          }}
        />
        <TextIcon
          className={cn('w-[1.25rem] cursor-pointer', {
            'text-crews-b05': questionType === QuestionType.NARRATIVE,
            'text-crews-g06': questionType !== QuestionType.NARRATIVE,
          })}
          onClick={() => {
            handleTypeClick(QuestionType.NARRATIVE);
          }}
        />
        <XMarkIcon
          className="w-[1rem] cursor-pointer text-crews-g06"
          onClick={() => removeQuestion(questionIndex)}
        />
      </div>
      <div className="bg-crews-w01 px-[1.25rem] py-[1.5rem]">
        <QuestionTextarea
          sectionIndex={sectionIndex}
          questionIndex={questionIndex}
        />

        <div className="flex items-center gap-[1rem]">
          <div className="flex items-center gap-[0.375rem]">
            <Typography className="text-[0.875rem] text-crews-g06">
              응답 필수
            </Typography>
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
          </div>

          {questionType === QuestionType.NARRATIVE && (
            <div className="flex items-center">
              <Typography className="text-[0.875rem] text-crews-g06">
                글자 수 제한
              </Typography>
              <WordLimitInput
                sectionIndex={sectionIndex}
                questionIndex={questionIndex}
              />

              <Typography className="text-[0.875rem] text-crews-g06">
                자
              </Typography>
            </div>
          )}
        </div>

        {questionType === QuestionType.SELECTIVE && (
          <>
            <div>최소 선택, 최대 선택</div>
            <input
              className="bg-indigo-400"
              {...register(
                `sections.${sectionIndex}.questions.${questionIndex}.minimumSelection`,
              )}
            />
            <input
              className="bg-sky-500"
              {...register(
                `sections.${sectionIndex}.questions.${questionIndex}.maximumSelection`,
              )}
            />
          </>
        )}

        {questionType === QuestionType.SELECTIVE && (
          <ChoiceSection
            sectionIndex={sectionIndex}
            questionIndex={questionIndex}
          />
        )}
      </div>
    </Container>
  );
};

export default QuestionBox;
