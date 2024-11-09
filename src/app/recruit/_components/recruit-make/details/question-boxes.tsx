import {
  useFieldArray,
  UseFieldArrayUpdate,
  useFormContext,
} from 'react-hook-form';

import CheckIcon from '../../../../../assets/icons/circle-check-icon.svg?react';
import TextIcon from '../../../../../assets/icons/text-icon.svg?react';
import XMarkIcon from '../../../../../assets/icons/x-mark-icon.svg?react';
import PlusIcon from '../../../../../assets/icons/plus-icon.svg?react';

import QuestionTextarea from './question-textarea.tsx';
import ChoiceSection from './choice-section.tsx';
import OptionSection from './option-section.tsx';
import Container from '../../../../../components/atom/container.tsx';
import { QuestionType } from '../../../../../lib/enums.ts';
import { cn } from '../../../../../lib/utils/utils.ts';
import { useToast } from '../../../../../hooks/use-toast.ts';
import {
  CREATED_NARRATIVE_QUESTION,
  CREATED_SELECTIVE_QUESTION,
} from '../../../../../lib/schemas/default-data.ts';
import { Button } from '../../../../../components/shadcn/button.tsx';
import { z } from 'zod';
import { CreatedRecruitmentSchema } from '../../../../../lib/schemas/recruitment-schema.ts';

const buttonDefaultStyle: string = 'h-4 w-4 cursor-pointer text-crews-g06';

const QuestionBox = ({
  sectionIndex,
  questionIndex,
  removeQuestion,
  update,
}: {
  sectionIndex: number;
  questionIndex: number;
  update: UseFieldArrayUpdate<z.infer<typeof CreatedRecruitmentSchema>>;
  removeQuestion: () => void;
}) => {
  const untouchable =
    sectionIndex === 0 &&
    (questionIndex === 0 || questionIndex === 1 || questionIndex === 2);
  const { watch } = useFormContext();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  const indexProps = {
    sectionIndex: sectionIndex,
    questionIndex: questionIndex,
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
          className={cn(buttonDefaultStyle, {
            'text-crews-b05': questionType === QuestionType.SELECTIVE,
          })}
          onClick={() => update(questionIndex, CREATED_SELECTIVE_QUESTION)}
        />
        <TextIcon
          className={cn(buttonDefaultStyle, {
            'text-crews-b05': questionType === QuestionType.NARRATIVE,
          })}
          onClick={() => update(questionIndex, CREATED_NARRATIVE_QUESTION)}
        />
        <XMarkIcon
          className={buttonDefaultStyle}
          onClick={() => removeQuestion()}
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

const QuestionBoxes = ({ sectionIndex }: { sectionIndex: number }) => {
  const { control } =
    useFormContext<z.infer<typeof CreatedRecruitmentSchema>>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions`,
  });

  const { toast } = useToast();
  const appendQuestion = () => {
    if (fields.length <= 10) append(CREATED_SELECTIVE_QUESTION);
    else
      toast({
        title: '질문은 섹션당 최대 10개 까지만 추가가능 합니다.',
        state: 'warning',
      });
  };

  const removeQuestion = (idx: number) => {
    if (fields.length > 1) remove(idx);
    else
      toast({
        title: '섹션은 반드시 하나의 질문을 포함해야 합니다.',
        state: 'warning',
      });
  };

  return (
    <Container className="flex flex-col gap-4 bg-crews-b01 p-4">
      <section className="flex flex-col gap-4">
        {fields.map((question, idx) => (
          <QuestionBox
            key={question.id}
            sectionIndex={sectionIndex}
            questionIndex={idx}
            removeQuestion={() => removeQuestion(idx)}
            update={update}
          />
        ))}
      </section>
      <Button
        type="button"
        className="ml-auto h-6 w-6 bg-crews-b04 text-sm font-semibold text-crews-w01"
        onClick={appendQuestion}
      >
        <PlusIcon className="h-3 w-3" />
      </Button>
    </Container>
  );
};

export default QuestionBoxes;
