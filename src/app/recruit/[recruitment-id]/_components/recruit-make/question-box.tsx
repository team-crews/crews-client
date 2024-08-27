import { PostRecruitmentsBody } from '../../../../../lib/types';

interface QuestionBoxProps {
  question: PostRecruitmentsBody['sections'][number]['questions'][number];
}

const QuestionBox = ({ question }: QuestionBoxProps) => {
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
      <input
        type="text"
        value={question.content}
        placeholder="질문"
        className="underline"
      />
      {renderChoicesSection()}
    </div>
  );
};

export default QuestionBox;
