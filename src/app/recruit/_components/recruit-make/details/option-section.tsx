import { useFormContext } from 'react-hook-form';
import LimitedNumberInput from './limited-number-input.tsx';
import Typography from '../../../../../components/shared/typography.tsx';
import { Switch } from '../../../../../components/ui/switch.tsx';
import { QuestionType } from '../../../../../lib/enums.ts';

interface OptionSectionProps {
  sectionIndex: number;
  questionIndex: number;
}

const MAX_SELECTION_LENGTH = 2;

const MAX_WORD_LIMIT_LENGTH = 4;

const OptionSection = ({ sectionIndex, questionIndex }: OptionSectionProps) => {
  const { watch, setValue } = useFormContext();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  return (
    <section className="mt-3 flex w-full items-center justify-end">
      <div className="flex items-center gap-3">
        {questionType === QuestionType.SELECTIVE && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Typography className="text-xs text-crews-g06">
                최소 선택
              </Typography>
              <LimitedNumberInput
                name={`sections.${sectionIndex}.questions.${questionIndex}.minimumSelection`}
                maxLength={MAX_SELECTION_LENGTH}
              />
            </div>
            <div className="flex items-center gap-1">
              <Typography className="text-xs text-crews-g06">
                최대 선택
              </Typography>
              <LimitedNumberInput
                name={`sections.${sectionIndex}.questions.${questionIndex}.maximumSelection`}
                maxLength={MAX_SELECTION_LENGTH}
              />
            </div>
          </div>
        )}

        {questionType === QuestionType.NARRATIVE && (
          <div className="flex items-center gap-1">
            <Typography className="text-xs text-crews-g06">
              글자 수 제한
            </Typography>
            <LimitedNumberInput
              name={`sections.${sectionIndex}.questions.${questionIndex}.wordLimit`}
              maxLength={MAX_WORD_LIMIT_LENGTH}
            />
            <Typography className="text-xs text-crews-g06">자</Typography>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Typography className="text-xs text-crews-g06">응답 필수</Typography>
          <Switch
            checked={watch(
              `sections.${sectionIndex}.questions.${questionIndex}.necessity`,
            )}
            onCheckedChange={(value) => {
              setValue(
                `sections.${sectionIndex}.questions.${questionIndex}.necessity`,
                value,
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default OptionSection;
