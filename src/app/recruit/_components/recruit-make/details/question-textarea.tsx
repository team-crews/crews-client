import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { isFilledInput } from '../../../../../lib/utils/validation.ts';
import useAutosizeTextarea from '../../../../../hooks/use-autosize-textarea.ts';
import Separator from '../../../../../components/shadcn/seperator.tsx';
import { cn } from '../../../../../lib/utils/utils.ts';

interface QuestionTextareaProps {
  sectionIndex: number;
  questionIndex: number;
}

const QuestionTextarea = ({
  sectionIndex,
  questionIndex,
}: QuestionTextareaProps) => {
  const { register, watch } = useFormContext();

  const value = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.content`,
  );
  useAutosizeTextarea(
    `sections.${sectionIndex}.questions.${questionIndex}.content`,
    value,
  );

  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div className="flex h-full w-full flex-col gap-1">
      <textarea
        maxLength={250}
        spellCheck={false}
        className="text-sm font-semibold text-crews-bk01"
        rows={1}
        placeholder="질문을 작성해주세요."
        onFocus={() => setFocused(true)}
        {...register(
          `sections.${sectionIndex}.questions.${questionIndex}.content`,
          {
            validate: {
              validateIfFilled: (v) =>
                isFilledInput(v, '채워지지 않은 질문 내용이 존재해요.'),
            },
            onBlur: () => setFocused(false),
          },
        )}
      />
      <Separator
        className={cn({
          'bg-crews-b06': focused,
          'bg-crews-g02': !focused,
        })}
      />
    </div>
  );
};

export default QuestionTextarea;
