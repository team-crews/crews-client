import { useFormContext } from 'react-hook-form';
import Container from '../../../../components/shared/container';
import Typography from '../../../../components/shared/typography';
import { IQuestion } from '../../../../lib/model/i-section';
import { IFormApplication } from '../page';
import ApplyChoiceBox from './apply-choice-box';

const ApplySelectiveBox = ({ question }: { question: IQuestion }) => {
  const { watch, setValue } = useFormContext<IFormApplication>();

  const currentAnswerIndex = watch('answers').findIndex(
    (answer) =>
      answer.questionId === question.id && answer.questionType === 'SELECTIVE',
  );

  // make new answer if not exist, currentAnswerIndex === -1인 item 생성 방지를 위해 return null
  if (currentAnswerIndex === -1) {
    setValue('answers', [
      ...watch('answers'),
      {
        answerId: null,
        questionId: question.id,
        content: null,
        choiceIds: [],
        questionType: 'SELECTIVE',
      },
    ]);

    return null;
  }

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
    <Container className="rounded-xl bg-crews-w01 p-3">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Typography className="h-auto w-full text-sm font-semibold text-crews-bk01">
            {question.content}
          </Typography>
          <Typography className="text-xs text-crews-b06">
            {displayText}
          </Typography>
        </div>

        <div className="flex flex-col gap-1">
          {question.choices.map((choice) => (
            <ApplyChoiceBox
              key={choice.id}
              choice={choice}
              currentAnswerIndex={currentAnswerIndex}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ApplySelectiveBox;
