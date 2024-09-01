// import { useEffect, useRef } from 'react';

import { useFormContext } from 'react-hook-form';

interface QuestionTextareaProps {
  sectionIndex: number;
  questionIndex: number;
}

const QuestionTextarea = ({
  sectionIndex,
  questionIndex,
}: QuestionTextareaProps) => {
  const { register, setValue } = useFormContext();

  // const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const textarea = e.target;

  //   setValue(
  //     `sections.${sectionIndex}.questions.${questionIndex}.content`,
  //     textarea.value,
  //   );

  //   textarea.style.height = '1.75rem'; // 초기 높이 설정
  //   textarea.style.height = `${textarea.scrollHeight / 16}rem`;
  // };

  return (
    <div className="flex h-full w-full flex-col gap-[1rem]">
      <textarea
        className="w-full bg-rose-300 text-[1.125rem] font-semibold text-crews-bk02"
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
