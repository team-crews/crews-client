import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Separator from '../../../../../components/shadcn/seperator.tsx';
import { isFilledInput } from '../../../../../lib/utils/validation.ts';

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

  useEffect(() => {
    const textarea = document.querySelector(
      `textarea[name="sections.${sectionIndex}.questions.${questionIndex}.content"]`,
    ) as HTMLTextAreaElement;

    if (textarea) {
      textarea.style.height = 'auto';

      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
    }
  }, [questionIndex, sectionIndex, value]);

  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div className="flex h-full w-full flex-col gap-1">
      <textarea
        maxLength={250}
        spellCheck={false}
        className="h-auto w-full overflow-y-hidden text-sm font-semibold text-crews-bk01"
        rows={1}
        placeholder="질문을 작성해주세요."
        onFocus={() => setFocused(true)}
        {...register(
          `sections.${sectionIndex}.questions.${questionIndex}.content`,
          {
            validate: {
              isFilledInput: (v) =>
                isFilledInput(v, '채워지지 않은 질문 내용이 존재해요.'),
            },
            onBlur: () => setFocused(false),
          },
        )}
      />
      <Separator
        className={`h-[1px] rounded-full ${focused ? 'bg-crews-b06' : 'bg-crews-g02'}`}
      />
    </div>
  );
};

export default QuestionTextarea;
