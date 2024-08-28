import { useFormContext } from 'react-hook-form';
import { PostRecruitmentsBody } from '../../../../../lib/types';

interface QuestionBoxProps {
  sectionIndex: number;
  questionIndex: number;
}

const QuestionBox = ({ sectionIndex, questionIndex }: QuestionBoxProps) => {
  const { control, register } = useFormContext();

  const renderChoicesSection = () => {
    if (question.choices === null) {
      return null;
    }

    return (
      <div>
        {question.choices.map((choice) => (
          <div key={choice.id}>{choice.content}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="border-[0.125rem] border-crews-r02">
      {/* <input
        {...register(
          `sections.${sectionIndex}.questions.${questionIndex}.choices.${choiceIndex}.content`,
        )}
      />
      {renderChoicesSection()} */}
    </div>
  );
};

export default QuestionBox;
