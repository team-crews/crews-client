import {
  UseFieldArrayRemove,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

interface QuestionBoxProps {
  sectionIndex: number;
  questionIndex: number;
  removeQuestion: UseFieldArrayRemove;
}

const QuestionBox = ({
  sectionIndex,
  questionIndex,
  removeQuestion,
}: QuestionBoxProps) => {
  const { control, register, watch } = useFormContext();

  const {
    fields: choiceFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions.${questionIndex}.choices`,
  });

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  return (
    <div className="border-[0.125rem] border-crews-r02">
      <input
        {...register(
          `sections.${sectionIndex}.questions.${questionIndex}.content`,
        )}
        placeholder="질문 내용"
      />
      <select
        className="bg-cyan-300"
        {...register(
          `sections.${sectionIndex}.questions.${questionIndex}.type`,
        )}
      >
        <option value="NARRATIVE">서술형</option>
        <option value="SELECTIVE">선택형</option>
      </select>
      <button
        className="border-[0.125rem] border-crews-b06"
        type="button"
        onClick={() => removeQuestion(questionIndex)}
      >
        질문 삭제
      </button>

      {questionType === 'SELECTIVE' && (
        <div>
          {choiceFields.map((choice, choiceIndex) => (
            <div key={choice.id}>
              <input
                {...register(
                  `sections.${sectionIndex}.questions.${questionIndex}.choices.${choiceIndex}.content`,
                )}
                placeholder="Choice Content"
              />
              <button type="button" onClick={() => removeChoice(choiceIndex)}>
                선택지 삭제
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendChoice({ id: null, content: '' })}
          >
            선택지 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionBox;
