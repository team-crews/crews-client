import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import CheckIcon from '../../../../assets/icons/circle-check-icon.svg?react';
import TextIcon from '../../../../assets/icons/text.svg?react';
import XMarkIcon from '../../../../assets/icons/x-mark.svg?react';

import QuestionTextarea from './question-textarea';
import ChoiceSection from './choice-section';
import OptionSection from './option-section';
import Container from '../../../../components/shared/container.tsx';
import { QuestionType } from '../../../../lib/enums.ts';
import { cn } from '../../../../lib/utils.ts';

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
  const { watch, setValue } = useFormContext();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  const handleTypeClick = (type: QuestionType) => {
    setValue(`sections.${sectionIndex}.questions.${questionIndex}.type`, type);
  };

  const indexProps = {
    sectionIndex: sectionIndex,
    questionIndex: questionIndex,
  };

  return (
    <Container>
      <div className="flex w-fit items-center gap-[0.5rem] rounded-t-[0.625rem] border-crews-g02 bg-crews-w01 p-[0.75rem]">
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
      <div className="rounded-b-[0.625rem] rounded-tr-[0.625rem] bg-crews-w01 px-[1.25rem] py-[1.5rem]">
        <QuestionTextarea {...indexProps} />

        {questionType === QuestionType.SELECTIVE && (
          <>
            <ChoiceSection {...indexProps} />
            <div className="mt-[1rem] h-[1px] w-full bg-crews-g03" />
          </>
        )}

        <OptionSection {...indexProps} />
      </div>
    </Container>
  );
};

export default QuestionBox;
