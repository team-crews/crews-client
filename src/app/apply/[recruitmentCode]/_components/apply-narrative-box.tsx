import { useFormContext } from 'react-hook-form';
import Container from '../../../../components/shared/container';
import Typography from '../../../../components/shared/typography';
import { IQuestion } from '../../../../lib/model/i-section';
import { IFormApplication } from '../page';

const ApplyNarrativeBox = ({ question }: { question: IQuestion }) => {
  const { register, watch, setValue } = useFormContext<IFormApplication>();

  const currentAnswerIndex = watch('answers').findIndex(
    (answer) =>
      answer.questionId === question.id && answer.questionType === 'NARRATIVE',
  );

  // make new answer if not exist, currentAnswerIndex === -1인 item 생성 방지를 위해 return null
  if (currentAnswerIndex === -1) {
    setValue('answers', [
      ...watch('answers'),
      {
        answerId: null,
        questionId: question.id,
        content: '',
        choiceIds: null,
        questionType: 'NARRATIVE',
      },
    ]);

    return null;
  }

  const currentContent = watch(`answers.${currentAnswerIndex}.content`) || '';
  const necessityText = question.necessity ? '응답 필수' : '';

  const wordLimitText = question.wordLimit
    ? `글자수 (${currentContent.length}/${question.wordLimit})`
    : '';

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
          placeholder="이곳에 답변을 입력해주세요."
          {...register(`answers.${currentAnswerIndex}.content`, {
            required: question.necessity
              ? '해당 필드는 응답 필수입니다.'
              : false,
            maxLength: question.wordLimit || undefined,
          })}
          maxLength={question.wordLimit || undefined}
          onInput={(e) => {
            // 한글 타이핑 시 글자수 제한을 넘기는 이슈 방지
            const { value } = e.target as HTMLInputElement;

            const maxLength = question.wordLimit || undefined;
            if (maxLength && value.length > maxLength) {
              (e.target as HTMLInputElement).value = value.slice(0, maxLength);
            }
          }}
        />
      </div>
    </Container>
  );
};

export default ApplyNarrativeBox;
