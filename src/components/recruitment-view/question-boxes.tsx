import Container from '../shared/container.tsx';
import Typography from '../shared/typography.tsx';
import {
  IAnswer,
  INarrativeAnswer,
  ISelectiveAnswer,
} from '../../lib/types/models/i-application.ts';
import {
  INarrativeQuestion,
  IQuestion,
  ISelectiveQuestion,
} from '../../lib/types/models/i-question.ts';

const QuestionBoxes = ({
  questions,
  answers,
}: {
  questions: IQuestion[];
  answers?: IAnswer[];
}) => {
  return (
    <section className="flex h-fit flex-col gap-4">
      {questions.map((question) => {
        const filteredAnswers = answers
          ? answers.filter((ans) => ans.questionId === question.id)
          : undefined;

        return question.type === 'SELECTIVE' ? (
          <SelectiveBox
            key={crypto.randomUUID()}
            question={question}
            answers={filteredAnswers as ISelectiveAnswer[]}
          />
        ) : (
          <NarrativeBox
            key={crypto.randomUUID()}
            question={question}
            answers={
              filteredAnswers
                ? (filteredAnswers[0] as INarrativeAnswer)
                : undefined
            }
          />
        );
      })}
    </section>
  );
};

const SelectiveBox = ({
  question,
  answers,
}: {
  question: ISelectiveQuestion;
  answers?: ISelectiveAnswer[];
}) => {
  const necessityText = question.necessity ? '응답 필수' : '';

  const minText = `최소 선택: ${question.minimumSelection}`;
  const maxText = `최대 선택: ${question.maximumSelection}`;

  const displayText = [necessityText, minText, maxText]
    .filter(Boolean)
    .join(', ');

  const choices = answers?.map((ans) => ans.choiceId);

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
            <div key={choice.id} className="flex items-center gap-2">
              {choices?.includes(choice.id) ? (
                <div className="flex h-3 w-3 items-center justify-center rounded-full border border-crews-g03">
                  <div className="h-2 w-2 rounded-full bg-crews-b05" />
                </div>
              ) : (
                <div className="h-3 w-3 rounded-full border border-crews-g03" />
              )}
              <div className="text-sm font-light text-crews-bk01">
                {choice.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

const NarrativeBox = ({
  question,
  answers,
}: {
  question: INarrativeQuestion;
  answers?: INarrativeAnswer;
}) => {
  const necessityText = question.necessity ? '응답 필수' : '';

  const wordLimitText = `글자수 (${answers?.content.length ?? 0}/${question.wordLimit})`;

  const displayText = [necessityText, wordLimitText].filter(Boolean).join(', ');

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

        <textarea
          rows={3}
          className="w-full rounded-lg p-2 text-xs outline outline-1 outline-crews-g02 placeholder:font-light placeholder:text-crews-g03"
          disabled={true}
          placeholder="이곳에 답변을 입력해주세요."
          value={answers?.content ?? ''}
        />
      </div>
    </Container>
  );
};

export default QuestionBoxes;
