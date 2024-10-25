import Container from '../shared/container.tsx';
import Typography from '../shared/typography.tsx';
import { z } from 'zod';
import {
  AnswerSchema,
  NarrativeAnswerSchema,
  SelectiveAnswerSchema,
} from '../../lib/types/schemas/application-schema.ts';
import {
  NarrativeQuestionSchema,
  QuestionSchema,
  SelectiveQuestionSchema,
} from '../../lib/types/schemas/question-schema.ts';

const QuestionBoxes = ({
  questions,
  answers,
}: {
  questions: z.infer<typeof QuestionSchema>[];
  answers?: z.infer<typeof AnswerSchema>[];
}) => {
  const selectiveAnswerMap = answers
    ?.filter((ans) => ans.type === 'SELECTIVE')
    .reduce(
      (map, ans) => {
        map[ans.questionId] = ans;
        return map;
      },
      {} as Record<
        z.infer<typeof SelectiveAnswerSchema>['questionId'],
        z.infer<typeof SelectiveAnswerSchema>
      >,
    );

  const narrativeAnswerMap = answers
    ?.filter((ans) => ans.type === 'NARRATIVE')
    .reduce(
      (map, ans) => {
        map[ans.questionId] = ans;
        return map;
      },
      {} as Record<
        z.infer<typeof NarrativeAnswerSchema>['questionId'],
        z.infer<typeof NarrativeAnswerSchema>
      >,
    );

  return (
    <section className="flex h-fit flex-col gap-4">
      {questions.map((question) => {
        return question.type === 'SELECTIVE' ? (
          <SelectiveBox
            key={crypto.randomUUID()}
            question={question}
            answer={selectiveAnswerMap?.[question.id]}
          />
        ) : (
          <NarrativeBox
            key={crypto.randomUUID()}
            question={question}
            answer={narrativeAnswerMap?.[question.id]}
          />
        );
      })}
    </section>
  );
};

const SelectiveBox = ({
  question,
  answer,
}: {
  question: z.infer<typeof SelectiveQuestionSchema>;
  answer?: z.infer<typeof SelectiveAnswerSchema>;
}) => {
  const necessityText = question.necessity ? '응답 필수' : '';

  const minText = `최소 선택: ${question.minimumSelection}`;
  const maxText = `최대 선택: ${question.maximumSelection}`;

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
            <div key={choice.id} className="flex items-center gap-2">
              {(answer?.choiceIds ?? []).includes(choice.id) ? (
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
  answer,
}: {
  question: z.infer<typeof NarrativeQuestionSchema>;
  answer?: z.infer<typeof NarrativeAnswerSchema>;
}) => {
  const necessityText = question.necessity ? '응답 필수' : '';

  const wordLimitText = `글자수 (${(answer?.content ?? '').length ?? 0}/${question.wordLimit})`;

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
          value={answer?.content ?? ''}
        />
      </div>
    </Container>
  );
};

export default QuestionBoxes;
