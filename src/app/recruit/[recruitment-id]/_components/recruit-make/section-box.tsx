import { useFieldArray, useFormContext } from 'react-hook-form';
import QuestionBox from './question-box';

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
    <section className="rounded-t-[0.625rem]">
      <div className="flex flex-col rounded-t-[0.625rem] bg-crews-b04 p-[1.25rem]">
        <div className="flex justify-between">
          <input
            {...register(`sections.${sectionIndex}.name`)}
            className="bg-crews-b04 font-pretendard text-[1.375rem] font-bold text-crews-w01"
            placeholder="섹션 이름"
          />
          <button onClick={() => removeSection(sectionIndex)}>섹션 삭제</button>
        </div>
        <input
          {...register(`sections.${sectionIndex}.description`)}
          className="bg-crews-b04 font-pretendard text-[0.875rem] text-crews-w01 underline"
          placeholder="섹션 설명"
        />
      </div>
      <div className="flex flex-col gap-[1.5rem] bg-crews-b01 px-[1.25rem] py-[1.5rem]">
        {questionFields.map((question, questionIndex) => (
          <QuestionBox
            key={question.id}
            sectionIndex={sectionIndex}
            questionIndex={questionIndex}
            removeQuestion={removeQuestion}
          />
        ))}
      </div>
      <button
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
      </button>
    </section>
  );
};

export default SectionBox;
