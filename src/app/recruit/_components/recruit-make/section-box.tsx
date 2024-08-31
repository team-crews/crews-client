import { useFieldArray, useFormContext } from 'react-hook-form';
import QuestionBox from './question-box.tsx';

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
    <section className="border-[0.125rem] border-crews-b06">
      <div className="flex flex-col bg-crews-b03">
        <input
          {...register(`sections.${sectionIndex}.name`)}
          placeholder="섹션 이름"
        />
        <input
          {...register(`sections.${sectionIndex}.description`)}
          placeholder="섹션 설명"
        />
        <button onClick={() => removeSection(sectionIndex)}>섹션 삭제</button>
      </div>
      <div className="flex flex-col gap-[0.5rem] p-[0.5rem]">
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
