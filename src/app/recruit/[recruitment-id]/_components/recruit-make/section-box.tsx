import { PostRecruitmentsBody } from '../../../../../lib/types';
import QuestionBox from './question-box';

interface SectionBoxProps {
  section: PostRecruitmentsBody['sections'][number];
}

const SectionBox = ({ section }: SectionBoxProps) => {
  return (
    <section className="border-[0.125rem] border-crews-b06">
      <div className="flex flex-col bg-crews-b03">
        <div>{section.name}</div>
        <div>{section.description}</div>
      </div>
      <div className="flex flex-col gap-[0.5rem] p-[0.5rem]">
        {section.questions.map((question) => (
          <QuestionBox key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
};

export default SectionBox;
