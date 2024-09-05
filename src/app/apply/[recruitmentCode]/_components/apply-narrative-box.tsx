import Container from '../../../../components/shared/container';
import Typography from '../../../../components/shared/typography';
import { IQuestion } from '../../../../lib/model/i-section';

interface ApplyNarrativeBoxProps {
  question: IQuestion;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

// 사용자가 작성 할 수 없는 view-only 모드를 위한 컴포넌트입니다.
const ApplyNarrativeBox = ({ question }: ApplyNarrativeBoxProps) => {
  const necessityText = question.necessity ? '응답 필수' : '';

  const wordLimitText = question.wordLimit
    ? `글자수 (0/${question.wordLimit})`
    : '';

  const displayText = [necessityText, wordLimitText].filter(Boolean).join(', ');

  return (
    <Container className="rounded-[0.625rem] bg-crews-w01 px-[1.25rem] py-[1.25rem]">
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-[0.625rem]">
          <Typography className="text-[1rem] font-bold text-crews-bk01">
            {question.content}
          </Typography>
          <Typography className="text-[0.875rem] text-crews-b06">
            {displayText}
          </Typography>
        </div>
        <textarea
          className="w-full rounded-[0.625rem] p-[1rem] text-[0.875rem] outline outline-[1px] outline-crews-g04 placeholder:text-crews-g04 disabled:bg-crews-w01"
          placeholder="이곳에 답변을 입력해주세요."
        />
      </div>
    </Container>
  );
};

export default ApplyNarrativeBox;
