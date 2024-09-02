import { IQuestion } from '../../lib/model/i-section';
import Container from './container';
import Typography from './typography';

interface NarrativeBoxProps {
  question: IQuestion;
  isViewOnly?: boolean;
}

const NarrativeBox = ({ question, isViewOnly = true }: NarrativeBoxProps) => {
  const necessityText = question.necessity ? '응답 필수' : '';
  const wordLimitText = question.wordLimit
    ? `글자수 (${20}/${question.wordLimit})`
    : '';

  const displayText = [necessityText, wordLimitText].filter(Boolean).join(', ');

  return (
    <Container className="rounded-[0.625rem] bg-crews-w01 px-[1.25rem] py-[1.25rem]">
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-[0.625rem]">
          <Typography className="text-[1.125rem] font-bold text-crews-bk01">
            {question.content}
          </Typography>

          <Typography className="text-[0.875rem] text-crews-b06">
            {displayText}
          </Typography>
        </div>
        <textarea
          className="w-full rounded-[0.625rem] p-[1rem] text-[1rem] outline outline-[1px] outline-crews-g04 placeholder:text-crews-g04"
          disabled={isViewOnly}
          placeholder="이곳에 답변을 입력해주세요."
        />
      </div>
    </Container>
  );
};

export default NarrativeBox;
