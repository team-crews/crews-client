import {
  UseFieldArrayRemove,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

import CheckIcon from '../../../../../assets/icons/circle-check-icon.svg?react';
import TextIcon from '../../../../../assets/icons/text.svg?react';
import { cn } from '../../../../../lib/utils';
import { QuestionType } from '../../../../../lib/enums';
import { Switch } from '../../../../../components/ui/switch';
import Typography from '../../../../../components/shared/typography';
import Container from '../../../../../components/shared/container';
import QuestionTextarea from './question-textarea';
import WordLimitInput from './word-limit-input';
// import QuestionTextarea from './question-textarea';

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
  const { control, register, watch, setValue } = useFormContext();

  const {
    fields: choiceFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions.${questionIndex}.choices`,
  });

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
          })}
          onClick={() => {
            handleTypeClick(QuestionType.SELECTIVE);
          }}
        />
        <TextIcon
          className={cn('w-[1.25rem] cursor-pointer', {
            'text-crews-b05': questionType === QuestionType.NARRATIVE,
          })}
          onClick={() => {
            handleTypeClick(QuestionType.NARRATIVE);
          }}
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
        <button
          className="border-[0.125rem] border-crews-b06"
          type="button"
          onClick={() => removeQuestion(questionIndex)}
        >
          질문 삭제
        </button>

        {questionType === QuestionType.SELECTIVE && (
          <div>
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
            {choiceFields.map((choice, choiceIndex) => (
              <div key={choice.id}>
                <input
                  {...register(
                    `sections.${sectionIndex}.questions.${questionIndex}.choices.${choiceIndex}.content`,
                  )}
                  placeholder="선택지 내용"
                />
                <button type="button" onClick={() => removeChoice(choiceIndex)}>
                  x
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendChoice({ id: null, content: '' })}
            >
              선택지 추가
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default QuestionBox;
