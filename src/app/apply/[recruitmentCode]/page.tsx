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
import { ISaveApplicationRequest } from '../../../lib/types/models/i-application.ts';
import { useToast } from '../../../hooks/use-toast';
import FooterContainer from '../../../components/shared/footer-container';
import { Button } from '../../../components/shadcn/button.tsx';
import ApplySectionHeader from './_components/apply-section-header';
import {
  checkSelectedAnswer,
  convertAnswerToFormAnswer,
  convertFormAnswerToAnswer,
  filterSelectedAnswer,
} from './_utils/utils';
import { useSectionSelection } from './_hooks/use-section-selection';
import { printCustomError } from '../../../lib/utils/error';
import { IQuestion } from '../../../lib/types/models/i-question.ts';

const untouchedFieldIndex = {
  name: 0,
  studentNumber: 1,
  major: 2,
};

export interface IFormApplication {
  id: number | null;
  studentNumber: string;
  major: string;
  name: string;
  answers: IFormAnswer[]; // answers 배열은 여러 답변 타입을 포함
}

export type IFormAnswer = {
  answerId: number | null;
  content: string | null;
  choiceIds: number[] | null;
  questionId: number;
  questionType: 'SELECTIVE' | 'NARRATIVE';
};

const defaultApplication: IFormApplication = {
  id: null,
  studentNumber: '00000000',
  name: 'DEFAULT_NAME',
  major: 'DEFAULT_MAJOR',
  answers: [],
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

  /**
   * Hook Form Control
   */
  const methods = useForm<IFormApplication>({
    defaultValues: defaultApplication,
  });

  const name = methods.watch(`answers.${untouchedFieldIndex.name}.content`);
  const major = methods.watch(`answers.${untouchedFieldIndex.major}.content`);
  const studentNumber = methods.watch(
    `answers.${untouchedFieldIndex.studentNumber}.content`,
  );

  const answers = methods.watch('answers');

  /**
   *  Section Selection Control
   */
  const {
    sharedSection,
    sectionSelections,
    selectedSection,
    handleSectionSelectionChange,
  } = useSectionSelection({
    recruitment,
    application,
    clearErrors: methods.clearErrors,
  });

  const saveMutate = useMutation({
    mutationFn: (requestBody: ISaveApplicationRequest) =>
      saveApplication(requestBody),
  });

  // chocie의 경우 submit 시 validation
  const validateChoices = (answers: IFormAnswer[] | null) => {
    if (!answers || !sharedSection) return;

    let valid: boolean = true;

    const getQuestionInfo = (questionId: number) =>
      recruitment?.sections
        .flatMap((section) => section.questions)
        .find(
          (question) =>
            question.id === questionId && question.type === 'SELECTIVE',
        );

    answers.forEach((answer, index) => {
      if (answer.questionType === 'NARRATIVE') return;

      const isSelectedSectionAnswer = checkSelectedAnswer(
        answer,
        selectedSection,
        sharedSection,
      );

      if (!isSelectedSectionAnswer) return;

      const question = getQuestionInfo(answer.questionId);

      if (question?.necessity && answer.choiceIds?.length === 0) {
        methods.setError(`answers.${index}`, {
          type: 'necessity',
          message: '해당 필드는 응답 필수입니다.',
        });

        valid = false;
      } else if (
        question?.minimumSelection &&
        answer.choiceIds &&
        answer.choiceIds.length > 0 &&
        answer.choiceIds.length < question.minimumSelection
      ) {
        methods.setError(`answers.${index}`, {
          type: 'minimumSelection',
          message: `최소 ${question.minimumSelection}개 이상 선택해주세요.`,
        });

        valid = false;
      } else if (
        question?.maximumSelection &&
        answer.choiceIds &&
        answer.choiceIds.length > 0 &&
        answer.choiceIds.length > question.maximumSelection
      ) {
        methods.setError(`answers.${index}`, {
          type: 'maximumSelection',
          message: `최대 ${question.maximumSelection}개 이하로 선택해주세요.`,
        });

        valid = false;
      }
    });

    return valid;
  };

  const onSubmit = async (data: IFormApplication) => {
    // submit 시 choice validation 수행
    const choiceValidate = validateChoices(data.answers);

    if (!choiceValidate || !sharedSection) {
      onFormError();
      return;
    }

    // 선택된 섹션에 해당하는 질문만 필터링
    const selectedSectionAnswers = filterSelectedAnswer(
      data.answers,
      selectedSection,
      sharedSection,
    );

    // FIXME: 강제로 answerId null로 설정하였는데, 기존 값이 있을 경우에는 그대로 사용하도록 수정 필요 (IFormApplication type 수정)
    const convertedAnswers = convertFormAnswerToAnswer(selectedSectionAnswers);

    const requestBody = {
      id: data.id,
      studentNumber: studentNumber || defaultApplication.studentNumber,
      name: name || defaultApplication.name,
      major: major || defaultApplication.major,
      answers: convertedAnswers,
      recruitmentCode: recruitmentCode!,
    };

    try {
      const response = await saveMutate.mutateAsync(requestBody);

      const convertedAnswers = convertAnswerToFormAnswer(response);

      methods.reset({
        id: response.id,
        studentNumber: response.studentNumber,
        name: response.name,
        major: response.major,
        answers: convertedAnswers,
      });

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
    // narrtive에서 에러 발생 시, onSubmit이 실행되지 않기 떄문에 choice에 대한 validation을 에러 시에 추가로 수행
    validateChoices(answers);

    toast({
      title: '입력을 다시 확인해주세요.',
      state: 'error',
    });
  };

  useEffect(() => {
    if (application) {
      //Convert ICreatedApplication to IFormApplication
      const formAnswers: IFormAnswer[] = convertAnswerToFormAnswer(application);

      methods.reset({
        id: application.id,
        studentNumber: application.studentNumber,
        name: application.name,
        major: application.major,
        answers: formAnswers,
      });
    }
  }, [application, methods]);

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
                  {sharedSection.questions.map((question) => (
                    <RenderQuestion key={question.id} question={question} />
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
                      selectionIndex={sectionSelections}
                      handleSelectionChange={handleSectionSelectionChange}
                    />

                    <ApplySectionBox
                      key={selectedSection.id}
                      name={selectedSection.name}
                      description={selectedSection.description}
                      isSelectable={true}
                    >
                      <div className="flex flex-col gap-8">
                        {selectedSection.questions.map((question) => (
                          <RenderQuestion
                            key={question.id}
                            question={question}
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
const RenderQuestion = ({ question }: { question: IQuestion }) => {
  switch (question.type) {
    case QuestionType.NARRATIVE:
      return <ApplyNarrativeBox question={question} />;
    case QuestionType.SELECTIVE:
      return <ApplySelectiveBox key={question.id} question={question} />;
    default:
      return null;
  }
};

export default Page;
