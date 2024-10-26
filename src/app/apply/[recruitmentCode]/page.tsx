import { useMutation, useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

import Container from '../../../components/shared/container';
import useApplicantApi from '../../../apis/applicant-api';

import Loading from '../../../components/shared/loading';
import { readRecruitmentByCode } from '../../../apis/base-api';
import ApplySectionBox from './_components/apply-section-box';
import ApplyNarrativeBox from './_components/apply-narrative-box';
import ApplySelectiveBox from './_components/apply-selective-box';
import { QuestionType } from '../../../lib/enums';
import HeaderSection from './_components/header-section';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  IFormApplicationTemp,
  ISaveApplication,
} from '../../../lib/types/models/i-application.ts';
import { useToast } from '../../../hooks/use-toast';
import FooterContainer from '../../../components/shared/footer-container';
import { Button } from '../../../components/ui/button';
import ApplySectionHeader from './_components/apply-section-header';
import {
  convertToFormApplication,
  convertToSaveApplication,
  filterSelectedAnswer,
} from './_utils/utils';
import { useSectionSelection } from './_hooks/use-section-selection';
import { printCustomError } from '../../../lib/utils/error';
import { IQuestion } from '../../../lib/types/models/i-question.ts';
import { useChoiceMap } from './_hooks/use-choice-map.tsx';

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

const defaultApplication: IFormApplicationTemp = {
  sections: [],
};

export const SHARED_SECTION_INDEX = 0;

const Page = () => {
  const { toast } = useToast();

  const [ableToSubmit, setAbleToSubmit] = useState<boolean>(false);

  const { recruitmentCode } = useParams<{ recruitmentCode: string }>();

  const { readApplication, saveApplication } = useApplicantApi(
    recruitmentCode!,
  );

  const { data: recruitment, ...recruitmentQuery } = useQuery({
    queryKey: ['recruitmentByCode', recruitmentCode],
    queryFn: () => readRecruitmentByCode(recruitmentCode!),
    enabled: !!recruitmentCode,
  });

  /** 저장된 값 없을 시 default로 set 하도록 에러 핸들링 */
  const { data: application, ...applicationQuery } = useQuery({
    queryKey: ['readApplication', recruitmentCode],
    queryFn: () => readApplication(),
    enabled: !!recruitmentCode,
  });

  const { choiceMap } = useChoiceMap({ recruitment });

  /**
   * Hook Form Control
   */
  const methods = useForm<IFormApplicationTemp>({
    defaultValues: defaultApplication,
  });

  // choice를 선택하지 않은 경우, false로 초기화
  useEffect(() => {
    if (application) {
      //Convert ICreatedApplication to IFormApplication
      const formApplication: IFormApplicationTemp = convertToFormApplication(
        application,
        choiceMap,
      );

      methods.reset(formApplication);
    } else {
      // 각 섹션에 대한 초기값 설정
      const initialSections = recruitment?.sections.map((section) => ({
        sectionId: section.id,
        answers: section.questions.map((question) => {
          if (question.type === QuestionType.NARRATIVE) {
            return {
              questionId: question.id,
              content: null,
              choiceIds: null,
              type: QuestionType.NARRATIVE,
            };
          } else {
            return {
              questionId: question.id,
              content: null,
              choiceIds: [],
              type: QuestionType.SELECTIVE,
            };
          }
        }),
      }));

      methods.reset({
        sections: initialSections || [],
      });
    }
  }, [application, choiceMap, methods, recruitment?.sections]);

  useEffect(() => {
    if (recruitment) {
      const now = new Date().getTime(); // 현재 시간
      const deadline = new Date(recruitment.deadline).getTime(); // 마감일

      if (now > deadline) {
        setAbleToSubmit(false); // 마감일이 지났으면 제출 불가능
      } else {
        setAbleToSubmit(true); // 마감일이 지나지 않았으면 제출 가능
      }
    }
  }, [recruitment]);

  /**
   *  Section Selection Control
   */
  const {
    sharedSection,
    selectedSectionIndex,
    selectedSection,
    isOnlySharedSection,
    handleSectionSelectionChange,
  } = useSectionSelection({
    recruitment,
    application,
    clearErrors: methods.clearErrors,
  });

  const saveMutate = useMutation({
    mutationFn: (requestBody: ISaveApplication) => saveApplication(requestBody),
  });

  const onSubmit = async (data: IFormApplicationTemp) => {
    if (!sharedSection) {
      onFormError();
      return;
    }

    // // 선택된 섹션에 해당하는 질문만 필터링
    const selectedSectionAnswers = filterSelectedAnswer(
      data.sections,
      selectedSectionIndex,
      isOnlySharedSection,
    );

    const convertedAnswers = convertToSaveApplication(selectedSectionAnswers);

    const name = methods.getValues(
      `sections.${SHARED_SECTION_INDEX}.answers.${untouchedFieldIndex.name}.content`,
    );
    const studentNumber = methods.getValues(
      `sections.${SHARED_SECTION_INDEX}.answers.${untouchedFieldIndex.studentNumber}.content`,
    );
    const major = methods.getValues(
      `sections.${SHARED_SECTION_INDEX}.answers.${untouchedFieldIndex.major}.content`,
    );

    const requestBody = {
      id: application?.id || null,
      studentNumber: studentNumber || defaultUntouchedField.studentNumber,
      name: name || defaultUntouchedField.name,
      major: major || defaultUntouchedField.major,
      sections: convertedAnswers,
      recruitmentCode: recruitmentCode!,
    };

    try {
      const response = await saveMutate.mutateAsync(requestBody);

      const convertedApplication = convertToFormApplication(
        response,
        choiceMap,
      );

      methods.reset(convertedApplication);

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

  const isRecruitmentError =
    recruitmentQuery.error || !recruitment || !sharedSection;

  if (applicationQuery.isFetching || recruitmentQuery.isFetching)
    return <Loading />;
  else if (isRecruitmentError) {
    printCustomError(recruitmentQuery.error, 'readQuery');
    return <Navigate to="/error" replace />;
  } else if (applicationQuery.isError) {
    printCustomError(applicationQuery.error, 'readApplication');

    return <Navigate to="/error" replace />;
  }

  return (
    <FormProvider {...methods}>
      <Container className="mx-auto w-[600px]">
        <div className="flex flex-col py-24">
          <HeaderSection />
          <form onSubmit={methods.handleSubmit(onSubmit, onFormError)}>
            <div className="mt-6 flex flex-col gap-8">
              <ApplySectionBox
                key={sharedSection.id}
                name={sharedSection.name}
                description={sharedSection.description}
              >
                <div className="flex flex-col gap-8">
                  {sharedSection.questions.map((question, index) => (
                    <RenderQuestion
                      key={question.id}
                      question={question}
                      questionIndex={index}
                      sectionIndex={SHARED_SECTION_INDEX}
                    />
                  ))}
                </div>
              </ApplySectionBox>
              {selectedSection && (
                <>
                  <p className="mt-4 text-base font-semibold text-crews-bk01">
                    제출 시 선택된 섹션의 내용만이 저장됩니다.
                  </p>
                  <div className="flex w-full flex-col">
                    <ApplySectionHeader
                      sections={recruitment.sections}
                      selectionIndex={selectedSectionIndex}
                      handleSelectionChange={handleSectionSelectionChange}
                    />

                    <ApplySectionBox
                      key={selectedSection.id}
                      name={selectedSection.name}
                      description={selectedSection.description}
                      isSelectable={true}
                    >
                      <div className="flex flex-col gap-8">
                        {selectedSection.questions.map((question, index) => (
                          <RenderQuestion
                            key={question.id}
                            question={question}
                            questionIndex={index}
                            sectionIndex={selectedSectionIndex}
                          />
                        ))}
                      </div>
                    </ApplySectionBox>
                  </div>
                </>
              )}
            </div>
            <FooterContainer className="flex w-full justify-end">
              <Button type="submit" size="lg" disabled={!ableToSubmit}>
                {ableToSubmit ? '제출하기' : '모집 기간이 아닙니다.'}
              </Button>
            </FooterContainer>
          </form>
        </div>
      </Container>
    </FormProvider>
  );
};

// 질문 타입별 확장성을 위한 컴포넌트 렌더링
const RenderQuestion = ({
  question,
  questionIndex,
  sectionIndex,
}: {
  question: IQuestion;
  questionIndex: number;
  sectionIndex: number;
}) => {
  switch (question.type) {
    case QuestionType.NARRATIVE:
      return (
        <ApplyNarrativeBox
          key={question.id}
          question={question}
          questionIndex={questionIndex}
          sectionIndex={sectionIndex}
        />
      );
    case QuestionType.SELECTIVE:
      return (
        <ApplySelectiveBox
          key={question.id}
          question={question}
          questionIndex={questionIndex}
          sectionIndex={sectionIndex}
        />
      );
    default:
      return null;
  }
};

export default Page;
