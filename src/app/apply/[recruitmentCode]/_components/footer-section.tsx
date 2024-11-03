import { useEffect, useState } from 'react';
import { Button } from '../../../../components/shadcn/button.tsx';
import CrewsFooter from '../../../../components/molecule/crews-footer.tsx';
import { useToast } from '../../../../hooks/use-toast.ts';
import { useMutation } from '@tanstack/react-query';
import { ISaveApplication } from '../../../../lib/types/schemas/application-schema.ts';
import {
  convertToFormApplication,
  convertToSaveApplication,
  filterSelectedAnswer,
} from '../_utils/utils.ts';
import { IFormApplication, SHARED_SECTION_INDEX } from '../page.tsx';
import { z } from 'zod';
import {
  DeadlineSchema,
  RecruitmentSchema,
} from '../../../../lib/types/schemas/recruitment-schema.ts';
import { useFormContext } from 'react-hook-form';
import useApplicantApi from '../../../../apis/applicant-api.ts';
import { useParams } from 'react-router-dom';
import { ReadApplicationResponseSchema } from '../../../../apis/response-body-schema.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';
import { generateChoiceMap } from '../_hooks/use-choice-map.tsx';
import dayjs from 'dayjs';
import { formatNumberTime } from '../../../../lib/utils/utils.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../../components/shadcn/tooltip.tsx';

const untouchedFieldIndex = {
  name: 0,
  studentNumber: 1,
  major: 2,
};

const defaultUntouchedField = {
  name: 'DEFAULT_NAME',
  studentNumber: 'DEFAULT_STUDENT_NUMBER',
  major: 'DEFAULT_MAJOR',
};

const FooterSection = ({
  deadline,
  application,
  selectedSectionIdx,
  isOnlySharedSection,
  recruitment,
}: {
  deadline: z.infer<typeof DeadlineSchema>;
  application: z.infer<typeof ReadApplicationResponseSchema>;
  selectedSectionIdx: number;
  isOnlySharedSection: boolean;
  recruitment: z.infer<typeof RecruitmentSchema>;
}) => {
  const { toast } = useToast();
  const { handleSubmit, getValues, reset } = useFormContext<IFormApplication>();

  const { recruitmentCode } = useParams<{ recruitmentCode: string }>();
  const { saveApplication } = useApplicantApi(recruitmentCode!);

  const [recruiting, setRecruiting] = useState(true);
  const [diff, setDiff] = useState<number>(dayjs(deadline).diff(dayjs()));

  const saveMutate = useMutation({
    mutationFn: (requestBody: ISaveApplication) => saveApplication(requestBody),
  });

  useEffect(() => {
    if (!recruiting) return;

    const interval = setInterval(() => {
      const diff = dayjs(deadline).diff(dayjs());
      if (diff <= 0) {
        setRecruiting(false);
        setDiff(0);
      } else {
        setDiff(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, recruiting]);

  const onSubmit = async (data: IFormApplication) => {
    // 선택된 섹션에 해당하는 질문만 필터링
    const selectedSectionAnswers = filterSelectedAnswer(
      data.sections,
      selectedSectionIdx,
      isOnlySharedSection,
    );

    // IFormApplication to ISaveApplication
    const convertedAnswers = convertToSaveApplication(selectedSectionAnswers);

    const name = getValues(
      `sections.${SHARED_SECTION_INDEX}.answers.${untouchedFieldIndex.name}.content`,
    );
    const studentNumber = getValues(
      `sections.${SHARED_SECTION_INDEX}.answers.${untouchedFieldIndex.studentNumber}.content`,
    );
    const major = getValues(
      `sections.${SHARED_SECTION_INDEX}.answers.${untouchedFieldIndex.major}.content`,
    );

    const requestBody = {
      id: application ? application.id : null,
      studentNumber: studentNumber || defaultUntouchedField.studentNumber,
      name: name || defaultUntouchedField.name,
      major: major || defaultUntouchedField.major,
      sections: convertedAnswers,
      recruitmentCode: recruitment.code,
    };

    try {
      const response = await saveMutate.mutateAsync(requestBody);
      const convertedApplication = convertToFormApplication(
        response,
        generateChoiceMap(recruitment),
      );

      reset(convertedApplication);

      toast({
        title: '지원서 저장이 완료되었습니다.',
        state: 'success',
      });
    } catch (e) {
      printCustomError(e, 'saveApplication');

      toast({
        title: '예기치 못한 오류가 발생했습니다.',
        state: 'error',
      });
    }
  };

  const onFormError = () => {
    toast({
      title: '입력을 다시 확인해주세요.',
      state: 'error',
    });
  };

  return (
    <>
      <CrewsFooter>
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={!recruiting}
              size="lg"
              onClick={handleSubmit(onSubmit, onFormError)}
            >
              {recruiting ? '제출하기' : '모집 기간이 아닙니다.'}
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>마감까지 {formatNumberTime(diff)}</p>
          </TooltipContent>
        </Tooltip>
      </CrewsFooter>
    </>
  );
};

export default FooterSection;
