import { useFieldArray, useFormContext } from 'react-hook-form';
import QuestionBox from './question-box';
import { Button } from '../../../../../components/ui/button';

import XMarkIcon from '../../../../../assets/icons/x-mark.svg?react';

interface SectionBoxProps {
  sectionIndex: number;
  removeSection: (index: number) => void;
}

const SectionBox = ({ sectionIndex, removeSection }: SectionBoxProps) => {
  const { control, register } = useFormContext();

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions`,
  });

  return (
    <section>
      <div className="flex flex-col rounded-t-[0.625rem] bg-crews-b04 p-[1.25rem]">
        <div className="flex items-center justify-between">
          <input
            {...register(`sections.${sectionIndex}.name`)}
            className="bg-crews-b04 font-pretendard text-[1.375rem] font-bold text-crews-w01"
            placeholder="섹션 이름"
          />
          <XMarkIcon
            className="h-[1.25rem] w-[1.25rem] cursor-pointer text-crews-w01"
            onClick={() => removeSection(sectionIndex)}
          />
        </div>
        <input
          {...register(`sections.${sectionIndex}.description`)}
          className="bg-crews-b04 font-pretendard text-[0.875rem] text-crews-w01 underline placeholder:text-crews-w01"
          placeholder="섹션에 대한 설명을 작성해주세요"
        />
      </div>

      <div className="flex flex-col gap-[1.5rem] rounded-b-[0.625rem] bg-crews-b01 px-[1.25rem] py-[1.5rem]">
        {questionFields.map((question, questionIndex) => (
          <QuestionBox
            key={question.id}
            sectionIndex={sectionIndex}
            questionIndex={questionIndex}
            removeQuestion={removeQuestion}
          />
        ))}
        <Button
          className="w-fit bg-crews-b04 p-[1rem]"
          onClick={() =>
            appendQuestion({
              id: null,
              type: 'NARRATIVE',
              content: '',
              necessity: true,
              order: questionFields.length + 1,
              wordLimit: 100,
              minimumSelection: null,
              maximumSelection: null,
              choices: [],
            })
          }
        >
          질문 추가
        </Button>
      </div>
    </section>
  );
};

export default SectionBox;
