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
      <div className="flex flex-col gap-[1rem]">
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
        <div className="flex flex-col gap-[0.5rem]">
          {question.choices.map((choice) => (
            <div key={choice.id} className="flex items-center gap-[0.5rem]">
              <input
                type="radio"
                className="h-[1rem] w-[1rem] rounded-full"
                value={''}
                // disabled={isViewOnly}
              />
              <label className="text-[0.875rem] text-crews-bk01">
                {choice.content}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default SelectiveBox;
