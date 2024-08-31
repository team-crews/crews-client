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
      <div className="border-[0.125rem] border-lime-600">
        {questionType === 'NARRATIVE' && (
          <div className="flex">
            <input
              className="w-[4rem] underline"
              {...register(
                `sections.${sectionIndex}.questions.${questionIndex}.wordLimit`,
              )}
              placeholder="단어 제한"
            />
            <span>자 이내</span>
          </div>
        )}
        <div className="flex">
          <input
            type="checkbox"
            {...register(
              `sections.${sectionIndex}.questions.${questionIndex}.necessity`,
            )}
          />
          <span>응답 필수</span>
        </div>
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
      </div>

      {questionType === 'SELECTIVE' && (
        <div>
          <div>최소 선택, 최대 선택</div>
          <input
            className="bg-indigo-400"
            {...register(
              `sections.${sectionIndex}.questions.${questionIndex}.minimumSelection`,
            )}
          />
          <input
            className="bg-sky-500"
            {...register(
              `sections.${sectionIndex}.questions.${questionIndex}.maximumSelection`,
            )}
          />
          {choiceFields.map((choice, choiceIndex) => (
            <div key={choice.id}>
              <input
                {...register(
                  `sections.${sectionIndex}.questions.${questionIndex}.choices.${choiceIndex}.content`,
                )}
                placeholder="선택지 내용"
              />
              <button type="button" onClick={() => removeChoice(choiceIndex)}>
                x
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
