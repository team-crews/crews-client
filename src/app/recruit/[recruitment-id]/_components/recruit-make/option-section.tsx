import { useFormContext } from 'react-hook-form';
import Typography from '../../../../../components/shared/typography';
import WordLimitInput from './word-limit-input';
import { Switch } from '../../../../../components/ui/switch';
import { QuestionType } from '../../../../../lib/enums';

interface OptionSectionProps {
  sectionIndex: number;
  questionIndex: number;
}

// const MAX_SELECTION = 10;

const OptionSection = ({ sectionIndex, questionIndex }: OptionSectionProps) => {
  const { register, watch, setValue } = useFormContext();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  return (
    <section className="flex w-full justify-end">
      <div className="flex items-end gap-[0.5rem]">
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
        </div>

        {questionType === QuestionType.SELECTIVE && (
          <div className="flex items-center gap-[0.5rem]">
            <div className="flex items-center gap-[0.25rem]">
              <Typography className="text-[0.875rem] text-crews-g06">
                최소 선택
              </Typography>
              <input
                type="number"
                className="w-[1.5rem] text-[0.875rem] font-bold underline"
                {...register(
                  `sections.${sectionIndex}.questions.${questionIndex}.minimumSelection`,
                )}
                placeholder="000"
              />
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <Typography className="text-[0.875rem] text-crews-g06">
                최대 선택
              </Typography>
              <input
                type="number"
                className="w-[1.5rem] text-[0.875rem] font-bold underline"
                {...register(
                  `sections.${sectionIndex}.questions.${questionIndex}.maximumSelection`,
                )}
              />
            </div>
          </div>
        )}

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
    </section>
  );
};

export default OptionSection;
