import { GetRecruitmentsReadyResponse } from '../../../../../lib/types';
import FormBox from './form-box';

interface FormSectionProps {
  section: GetRecruitmentsReadyResponse['sections'][number];
}

const FormSection = ({ section }: FormSectionProps) => {
  return (
    <section className="border-[0.125rem] border-crews-b06">
      <div className="flex flex-col bg-crews-b03">
        <div>{section.name}</div>
        <div>{section.description}</div>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        {section.questions.map((question) => (
          <FormBox key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
};

export default FormSection;
