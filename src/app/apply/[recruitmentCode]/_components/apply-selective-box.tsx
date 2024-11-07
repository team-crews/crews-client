import { useFormContext } from 'react-hook-form';
import Container from '../../../../components/atom/container.tsx';
import Typography from '../../../../components/atom/typography.tsx';

import ApplyChoiceBox from './apply-choice-box';
import { useState } from 'react';
import { IFormApplication } from '../page.tsx';
import { z } from 'zod';
import { QuestionSchema } from '../../../../lib/types/schemas/question-schema.ts';

interface ApplySelectiveBoxProps {
  question: z.infer<typeof QuestionSchema>;
  questionIndex: number;
  sectionIndex: number;
}

const ApplySelectiveBox = ({
  question,
  questionIndex,
  sectionIndex,
}: ApplySelectiveBoxProps) => {
  const {
    formState: { errors },
  } = useFormContext<IFormApplication>();

  //가장 최근 에러가 발생한 choice index
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  const handleErrorIndexChange = (index: number) => {
    setErrorIndex(index);
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

  const fieldError = errorIndex
    ? errors.sections?.[sectionIndex]?.answers?.[questionIndex]?.choiceIds?.[
        errorIndex
      ]
    : false;

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
              choiceIndex={index}
              questionIndex={questionIndex}
              sectionIndex={sectionIndex}
              onErrorIndexChange={handleErrorIndexChange}
            />
          ))}
        </div>
      </div>
      {fieldError ? (
        <Typography className="text-xs text-crews-r03">
          {fieldError?.message}
        </Typography>
      ) : null}
    </Container>
  );
};

export default ApplySelectiveBox;
