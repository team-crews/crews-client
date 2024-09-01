import { useFormContext } from 'react-hook-form';
import Typography from '../../../../../components/shared/typography';

import { Switch } from '../../../../../components/ui/switch';
import { QuestionType } from '../../../../../lib/enums';

interface OptionSectionProps {
  sectionIndex: number;
  questionIndex: number;
}

const MAX_SELECTION_LENGTH = 3;

const MAX_WORD_LIMIT_LENGTH = 4;

const OptionSection = ({ sectionIndex, questionIndex }: OptionSectionProps) => {
  const { watch, setValue } = useFormContext();

  const questionType = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.type`,
  );

  const wordLimitValue = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.wordLimit`,
  );

  const minimumSelectionValue = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.minimumSelection`,
  );

  const maximumSelectionValue = watch(
    `sections.${sectionIndex}.questions.${questionIndex}.maximumSelection`,
  );

  const handleLimitedNumberChange = (
    name: string,
    limit: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    const numberRegex = /^$|^\d+$/;

    if (!numberRegex.test(value) || value.length > limit) {
      return;
    }

    const isValueNull = value !== '';

    const updatedValue = isValueNull ? Number(value) : null;

    setValue(name, updatedValue);
  };

  return (
    <section className="mt-[1rem] flex w-full justify-end">
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
              <div className="flex h-[0.875rem] w-[1.75rem] items-center justify-center border-b-[1px] border-crews-bk02">
                <input
                  value={minimumSelectionValue}
                  className="h-full w-full text-[0.875rem] font-bold text-crews-bk02"
                  placeholder="000"
                  onChange={(e) =>
                    handleLimitedNumberChange(
                      `sections.${sectionIndex}.questions.${questionIndex}.minimumSelection`,
                      MAX_SELECTION_LENGTH,
                      e,
                    )
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <Typography className="text-[0.875rem] text-crews-g06">
                최대 선택
              </Typography>
              <div className="flex h-[0.875rem] w-[1.75rem] items-center justify-center border-b-[1px] border-crews-bk02">
                <input
                  value={maximumSelectionValue}
                  className="h-full w-full text-[0.875rem] font-bold text-crews-bk02"
                  placeholder="000"
                  onChange={(e) =>
                    handleLimitedNumberChange(
                      `sections.${sectionIndex}.questions.${questionIndex}.maximumSelection`,
                      MAX_SELECTION_LENGTH,
                      e,
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}

        {questionType === QuestionType.NARRATIVE && (
          <div className="flex items-center gap-[0.25rem]">
            <Typography className="text-[0.875rem] text-crews-g06">
              글자 수 제한
            </Typography>

            <div className="flex h-[0.875rem] w-[2.375rem] items-center justify-center border-b-[1px] border-crews-bk02">
              <input
                value={wordLimitValue}
                className="h-full w-full text-[0.875rem] font-bold text-crews-bk02"
                placeholder="0000"
                onChange={(e) =>
                  handleLimitedNumberChange(
                    `sections.${sectionIndex}.questions.${questionIndex}.wordLimit`,
                    MAX_WORD_LIMIT_LENGTH,
                    e,
                  )
                }
              />
            </div>

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
