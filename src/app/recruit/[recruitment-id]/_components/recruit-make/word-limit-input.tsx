import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface WordLimitInputProps {
  sectionIndex: number;
  questionIndex: number;
}

const MAX_LENGTH = 4;

const WordLimitInput = ({
  sectionIndex,
  questionIndex,
}: WordLimitInputProps) => {
  const { register } = useFormContext();

  const value = useWatch({
    name: `sections.${sectionIndex}.questions.${questionIndex}.wordLimit`,
  });

  useEffect(() => {
    const input = document.querySelector(
      `input[name="sections.${sectionIndex}.questions.${questionIndex}.wordLimit"]`,
    ) as HTMLInputElement;

    if (input) {
      const currentLength = input.value.length;

      input.style.width = `${currentLength}ch`;
    }
  }, [questionIndex, sectionIndex, value]);

  return (
    <input
      className="text-[0.875rem] font-bold underline"
      type="number"
      {...register(
        `sections.${sectionIndex}.questions.${questionIndex}.wordLimit`,
      )}
      maxLength={MAX_LENGTH}
      placeholder="000"
    />
  );
};

export default WordLimitInput;
