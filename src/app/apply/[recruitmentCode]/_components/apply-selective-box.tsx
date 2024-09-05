import Container from '../../../../components/shared/container';
import Typography from '../../../../components/shared/typography';
import { IQuestion } from '../../../../lib/model/i-section';
import ApplyChoiceBox from './apply-choice-box';
import { useState } from 'react';

interface ApplySelectiveBoxProps {
  question: IQuestion;
}

const ApplySelectiveBox = ({ question }: ApplySelectiveBoxProps) => {
  const [choiceErrorMessage, setChoiceErrorMessage] = useState<string | null>(
    null,
  );

  const handleChoiceError = (message: string | null) => {
    setChoiceErrorMessage(message);
  };

  const necessityText = question.necessity ? '응답 필수' : '';

  const minText = question.minimumSelection
    ? `최소 선택: ${question.minimumSelection}`
    : '';
  const maxText = question.maximumSelection
    ? `최대 선택: ${question.maximumSelection}`
    : '';

  const displayText = [necessityText, minText, maxText]
    .filter(Boolean)
    .join(', ');

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
        <div className="flex flex-col gap-[0.5rem]">
          {question.choices.map((choice) => (
            <ApplyChoiceBox
              key={choice.id}
              choice={choice}
              question={question}
              handleChoiceError={handleChoiceError}
            />
          ))}
        </div>
      </div>
      {choiceErrorMessage && (
        <Typography className="text-[0.875rem] text-crews-r03">
          {choiceErrorMessage}
        </Typography>
      )}
    </Container>
  );
};

export default ApplySelectiveBox;
