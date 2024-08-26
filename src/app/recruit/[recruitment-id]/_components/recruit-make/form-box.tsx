import { GetRecruitmentsReadyResponse } from '../../../../../lib/types';

interface FormBoxProps {
  question: GetRecruitmentsReadyResponse['sections'][number]['questions'][number];
}

const FormBox = ({ question }: FormBoxProps) => {
  return <div>{question.content}</div>;
};

export default FormBox;
