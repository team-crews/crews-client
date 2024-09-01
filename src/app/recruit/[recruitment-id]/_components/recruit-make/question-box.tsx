import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import CheckIcon from '../../../../../assets/icons/circle-check-icon.svg?react';
import TextIcon from '../../../../../assets/icons/text.svg?react';
import XMarkIcon from '../../../../../assets/icons/x-mark.svg?react';

import { cn } from '../../../../../lib/utils';
import { QuestionType } from '../../../../../lib/enums';

import Container from '../../../../../components/shared/container';

import QuestionTextarea from './question-textarea';
import ChoiceSection from './\bchoice-section';
import OptionSection from './option-section';

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

  const sectionProps = {
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
      <div className="bg-crews-w01 px-[1.25rem] py-[1.5rem]">
        <QuestionTextarea
          sectionIndex={sectionIndex}
          questionIndex={questionIndex}
        />

        {questionType === QuestionType.SELECTIVE && (
          <ChoiceSection {...sectionProps} />
        )}
        <div className="my-[1rem] h-[1px] w-full bg-crews-g03" />

        <OptionSection {...sectionProps} />
      </div>
    </Container>
  );
};

export default QuestionBox;
