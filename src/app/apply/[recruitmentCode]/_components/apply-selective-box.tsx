import { useFormContext } from 'react-hook-form';
import Container from '../../../../components/shared/container';
import Typography from '../../../../components/shared/typography';
import { IFormApplication } from '../page';
import ApplyChoiceBox from './apply-choice-box';
import { useEffect, useState } from 'react';
import { IQuestion } from '../../../../lib/types/models/i-question.ts';

interface ApplySelectiveBoxProps {
  question: IQuestion;
}

const ApplySelectiveBox = ({ question }: ApplySelectiveBoxProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<IFormApplication>();

  const currentAnswerIndex = watch('answers').findIndex(
    (answer) =>
      answer.questionId === question.id && answer.questionType === 'SELECTIVE',
  );

  //가장 최근 에러가 발생한 choice index
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  const handleErrorIndexChange = (index: number) => {
    setErrorIndex(index);
  };

  // make new answer if not exist, cuurentAnswerIndex === -1인 item 생성 방지를 위해 return null
  useEffect(() => {
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
    }
  }, [currentAnswerIndex, question.id, setValue, watch]);

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
          {question.choices.map((choice, index) => (
            <ApplyChoiceBox
              key={choice.id}
              choice={choice}
              question={question}
              index={index}
              currentAnswerIndex={currentAnswerIndex}
              onErrorIndexChange={handleErrorIndexChange}
            />
          ))}
        </div>
      </div>
      {errors.answers?.[currentAnswerIndex]?.choiceIds && errorIndex ? (
        <Typography className="text-xs text-crews-r03">
          {
            errors.answers?.[currentAnswerIndex]?.choiceIds?.[errorIndex]
              ?.message
          }
        </Typography>
      ) : null}
    </Container>
  );
};

export default ApplySelectiveBox;
