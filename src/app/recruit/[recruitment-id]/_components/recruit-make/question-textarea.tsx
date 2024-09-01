// import { useEffect, useRef } from 'react';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface QuestionTextareaProps {
  sectionIndex: number;
  questionIndex: number;
}

const QuestionTextarea = ({
  sectionIndex,
  questionIndex,
}: QuestionTextareaProps) => {
  const { register } = useFormContext();

  const value = useWatch({
    name: `sections.${sectionIndex}.questions.${questionIndex}.content`,
  });

  // useEffect로 textarea height 동적 설정
  useEffect(() => {
    const textarea = document.querySelector(
      `textarea[name="sections.${sectionIndex}.questions.${questionIndex}.content"]`,
    ) as HTMLTextAreaElement;

    if (textarea) {
      textarea.style.height = 'auto';

      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
    }
  }, [questionIndex, sectionIndex, value]);

  return (
    <div className="flex h-full w-full flex-col gap-[0.5rem]">
      <textarea
        className="h-auto w-full overflow-y-hidden text-[1.125rem] font-semibold text-crews-bk02"
        rows={1}
        placeholder="질문을 작성해주세요."
        {...register(
          `sections.${sectionIndex}.questions.${questionIndex}.content`,
        )}
      />
      <div className="h-[0.25rem] w-full bg-crews-b04" />
    </div>
  );
};

export default QuestionTextarea;
