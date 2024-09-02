import { IQuestion } from '../../lib/model/i-section';
import Container from './container';
import Typography from './typography';

interface SelectiveBoxProps {
  question: IQuestion;
  isViewOnly?: boolean;
}

const SelectiveBox = ({ question, isViewOnly = true }: SelectiveBoxProps) => {
  return (
    <Container className="rounded-[0.625rem] bg-crews-w01 px-[1.25rem] py-[1.25rem]">
      <div className="flex flex-col gap-[0.625rem]">
        <Typography className="text-[1.125rem] font-bold text-crews-bk01">
          {question.content}
        </Typography>

        {question.necessity ? (
          <Typography className="text-[0.875rem] text-crews-b06">
            응답 필수
          </Typography>
        ) : null}
        {question.wordLimit ? (
          <Typography className="text-[0.875rem] text-crews-b06">
            응답 필수
          </Typography>
        ) : null}
      </div>
    </Container>
  );
};

export default SelectiveBox;
