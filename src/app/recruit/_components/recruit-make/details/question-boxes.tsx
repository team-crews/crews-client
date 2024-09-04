import {
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  useFormContext,
} from 'react-hook-form';

import CheckIcon from '../../../../../assets/icons/circle-check-icon.svg?react';
import TextIcon from '../../../../../assets/icons/text.svg?react';
import XMarkIcon from '../../../../../assets/icons/x-mark.svg?react';

import QuestionTextarea from './question-textarea.tsx';
import ChoiceSection from './choice-section.tsx';
import OptionSection from './option-section.tsx';
import Container from '../../../../../components/shared/container.tsx';
import { QuestionType } from '../../../../../lib/enums.ts';
import { cn } from '../../../../../lib/utils.ts';
import {
  CREATED_NARRATIVE_QUESTION,
  CREATED_SELECTIVE_QUESTION,
  ICreatedQuestion,
} from '../../../../../lib/model/i-section.ts';
import { ICreatedRecruitment } from '../../../../../lib/model/i-recruitment.ts';
import { useToast } from '../../../../../hooks/use-toast.ts';

const QuestionBox = ({
  sectionIndex,
  questionIndex,
  removeQuestion,
  disableRemove,
  update,
}: {
  sectionIndex: number;
  questionIndex: number;
  update: UseFieldArrayUpdate<ICreatedRecruitment>;
  disableRemove: boolean;
  removeQuestion: UseFieldArrayRemove;
}) => {
  const untouchable =
    sectionIndex === 0 &&
    (questionIndex === 0 || questionIndex === 1 || questionIndex === 2);
  const { watch } = useFormContext();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  const handleNarrativeTypeClick = () => {
    update(questionIndex, CREATED_NARRATIVE_QUESTION);
  };

  const handleSelectiveTypeClick = () => {
    update(questionIndex, CREATED_SELECTIVE_QUESTION);
  };

  const indexProps = {
    sectionIndex: sectionIndex,
    questionIndex: questionIndex,
  };

  const checkIconColor: string =
    questionType === QuestionType.SELECTIVE
      ? 'text-crews-b05'
      : 'text-crews-g06';
  const textIconColor: string =
    questionType === QuestionType.SELECTIVE
      ? 'text-crews-g06'
      : 'text-crews-b05';

  const { toast } = useToast();
  const handleRemoveClick = () => {
    if (disableRemove) {
      toast({
        title: '섹션은 반드시 하나의 질문을 포함해야 합니다.',
        state: 'warning',
      });
      return;
    }
    removeQuestion(questionIndex);
  };

  return (
    <Container>
      <div
        className="mb-[-4px] flex w-fit gap-2 rounded-t-xl bg-crews-w01 p-3"
        style={{
          pointerEvents: untouchable ? 'none' : 'auto',
        }}
      >
        <CheckIcon
          className={cn('h-4 w-4 cursor-pointer', checkIconColor)}
          onClick={handleSelectiveTypeClick}
        />
        <TextIcon
          className={cn('h-4 w-4 cursor-pointer', textIconColor)}
          onClick={handleNarrativeTypeClick}
        />
        <XMarkIcon
          className="h-4 w-4 cursor-pointer text-crews-g06"
          onClick={handleRemoveClick}
        />
      </div>

      <div
        className="rounded-xl rounded-tl-none bg-crews-w01 p-3"
        style={{
          pointerEvents: untouchable ? 'none' : 'auto',
        }}
      >
        <QuestionTextarea {...indexProps} />

        {questionType === QuestionType.SELECTIVE && (
          <ChoiceSection {...indexProps} />
        )}

        <OptionSection {...indexProps} />
      </div>
    </Container>
  );
};

const QuestionBoxes = ({
  questionFields,
  ...props
}: {
  questionFields: ICreatedQuestion[];
  sectionIndex: number;
  removeQuestion: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<ICreatedRecruitment>;
}) => {
  return (
    <section className="flex flex-col gap-4">
      {questionFields.map((question, questionIndex) => (
        <QuestionBox
          disableRemove={questionFields.length == 1}
          key={question.id}
          questionIndex={questionIndex}
          {...props}
        />
      ))}
    </section>
  );
};

export default QuestionBoxes;
