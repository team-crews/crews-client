import { useFormContext } from 'react-hook-form';
import Container from '../../../../components/atom/container.tsx';
import Typography from '../../../../components/atom/typography.tsx';
import { IFormApplication } from '../page.tsx';
import { cn } from '../../../../lib/utils/utils.ts';
import { z } from 'zod';
import { QuestionSchema } from '../../../../lib/schemas/question-schema.ts';

interface ApplyNarrativeBoxProps {
  question: z.infer<typeof QuestionSchema>;
  questionIndex: number;
  sectionIndex: number;
}

const ApplyNarrativeBox = ({
  question,
  questionIndex,
  sectionIndex,
}: ApplyNarrativeBoxProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<IFormApplication>();

  const currentContent =
    watch(`sections.${sectionIndex}.answers.${questionIndex}.content`) || '';
  const necessityText = question.necessity ? '응답 필수' : '';

  const wordLimitText = question.wordLimit
    ? `글자수 (${currentContent.length}/${question.wordLimit})`
    : '';

  const fieldError =
    errors.sections?.[sectionIndex]?.answers?.[questionIndex]?.content;

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
          className={cn(
            'w-full rounded-lg p-2 text-xs outline outline-1 outline-crews-g02 placeholder:font-light placeholder:text-crews-g03',
            {
              'outline-crews-g04': !fieldError,
              'outline-crews-r03': fieldError,
            },
          )}
          placeholder="이곳에 답변을 입력해주세요."
          {...register(
            `sections.${sectionIndex}.answers.${questionIndex}.content`,
            {
              required: question.necessity
                ? '해당 필드는 응답 필수입니다.'
                : false,
              maxLength: question.wordLimit || undefined,
            },
          )}
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
      {fieldError && (
        <Typography className="text-xs text-crews-r03">
          {fieldError?.message}
        </Typography>
      )}
    </Container>
  );
};

export default ApplyNarrativeBox;
