import { useFormContext } from 'react-hook-form';
import Container from '../../../../components/shared/container';
import Typography from '../../../../components/shared/typography';
import { IQuestion } from '../../../../lib/model/i-section';
import { cn } from '../../../../lib/utils';
import { IFormApplication } from '../page';

interface ApplyNarrativeBoxProps {
  question: IQuestion;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const ApplyNarrativeBox = ({ question }: ApplyNarrativeBoxProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<IFormApplication>();

  const currentAnswerIndex = watch('answers').findIndex(
    (answer) =>
      answer.questionId === question.id && answer.questionType === 'NARRATIVE',
  );

  // make new answer if not exist, cuurentAnswerIndex === -1인 item 생성 방지를 위해 return null
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

  const isFieldError = errors.answers?.[currentAnswerIndex]?.content;

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
          className={cn(
            'w-full rounded-[0.625rem] p-[1rem] text-[0.875rem] outline outline-[1px] outline-crews-g04 placeholder:text-crews-g04',
            {
              'outline-crews-g04': !isFieldError,
              'outline-crews-r03': isFieldError,
            },
          )}
          placeholder="이곳에 답변을 입력해주세요."
          {...register(`answers.${currentAnswerIndex}.content`, {
            required: question.necessity ? '해당 필드는 필수입니다.' : false,
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
      {isFieldError && (
        <Typography className="text-[0.875rem] text-crews-r03">
          {errors.answers?.[currentAnswerIndex]?.content?.message}
        </Typography>
      )}
    </Container>
  );
};

export default ApplyNarrativeBox;
