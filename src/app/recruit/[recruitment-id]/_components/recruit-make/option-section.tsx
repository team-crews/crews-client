import { useFormContext } from 'react-hook-form';
import Typography from '../../../../../components/shared/typography';
import WordLimitInput from './word-limit-input';
import { Switch } from '../../../../../components/ui/switch';
import { QuestionType } from '../../../../../lib/enums';

interface OptionSectionProps {
  sectionIndex: number;
  questionIndex: number;
}

const OptionSection = ({ sectionIndex, questionIndex }: OptionSectionProps) => {
  const { register, watch, setValue } = useFormContext();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  return (
    <section>
      <div className="flex items-center gap-[1rem]">
        <div className="flex items-center gap-[0.375rem]">
          <Typography className="text-[0.875rem] text-crews-g06">
            응답 필수
          </Typography>
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

        {questionType === QuestionType.NARRATIVE && (
          <div className="flex items-center">
            <Typography className="text-[0.875rem] text-crews-g06">
              글자 수 제한
            </Typography>
            <WordLimitInput
              sectionIndex={sectionIndex}
              questionIndex={questionIndex}
            />

            <Typography className="text-[0.875rem] text-crews-g06">
              자
            </Typography>
          </div>
        )}
      </div>
      {questionType === QuestionType.SELECTIVE && (
        <>
          <div>최소 선택, 최대 선택</div>
          <input
            className="bg-indigo-400"
            {...register(
              `sections.${sectionIndex}.questions.${questionIndex}.minimumSelection`,
            )}
          />
          <input
            className="bg-sky-500"
            {...register(
              `sections.${sectionIndex}.questions.${questionIndex}.maximumSelection`,
            )}
          />
        </>
      )}
    </section>
  );
};

export default OptionSection;
