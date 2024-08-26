import { GetRecruitmentsReadyResponse } from '../../../../../lib/types';

interface FormSectionProps {
  section: GetRecruitmentsReadyResponse['sections'][number];
}

const FormSection = ({ section }: FormSectionProps) => {
  return <section>{section.description}</section>;
};

export default FormSection;
