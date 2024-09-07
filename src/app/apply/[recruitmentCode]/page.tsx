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
import { IQuestion } from '../../../lib/model/i-section';
import HeaderSection from './_components/header-section';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  ICreatedAnswer,
  ISaveApplicationRequest,
  ITempAnswer,
  ITempApplication,
  ITempNarrativeAnswer,
  ITempSelectiveAnswer,
} from '../../../lib/model/i-application';
import { useToast } from '../../../hooks/use-toast';
import FooterContainer from '../../../components/shared/footer-container';
import { Button } from '../../../components/ui/button';
import { printCustomError } from '../../../lib/utils/error.ts';

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

type IFormAnswer = {
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

const Page = () => {
  const { toast } = useToast();

  const { recruitmentCode } = useParams<{ recruitmentCode: string }>();

  const { readApplication, saveApplication } = useApplicantApi(
    recruitmentCode!,
  );

  const { data: recruitment, ...recruitmentQuery } = useQuery({
    queryKey: ['recruitmentByCode'],
    queryFn: () => readRecruitmentByCode(recruitmentCode!),
    enabled: !!recruitmentCode,
  });

  /** 저장된 값 없을 시 default로 set 하도록 에러 핸들링 */
  const { data: application, ...applicationQuery } = useQuery({
    queryKey: ['readApplication', recruitmentCode],
    queryFn: () => readApplication(),
    enabled: !!recruitmentCode,
  });

  const saveMutate = useMutation({
    mutationFn: (requestBody: ISaveApplicationRequest) =>
      saveApplication(requestBody),
  });

  const methods = useForm<IFormApplication>({
    defaultValues: defaultApplication,
  });

  const name = methods.watch(`answers.${untouchedFieldIndex.name}.content`);
  const major = methods.watch(`answers.${untouchedFieldIndex.major}.content`);
  const studentNumber = methods.watch(
    `answers.${untouchedFieldIndex.studentNumber}.content`,
  );

  // chocie의 경우 submit 시 validation
  const validateChoices = (answers: IFormAnswer[] | null) => {
    if (!answers) return;

    let valid: boolean = true;

    const getQuestionInfo = (questionId: number) =>
      recruitment?.sections
        .flatMap((section) => section.questions)
        .find((question) => question.id === questionId);

    answers.forEach((answer, index) => {
      if (answer.questionType === 'NARRATIVE') return;

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
    const choiceValidate = validateChoices(data.answers);

    if (!choiceValidate) {
      onFormError();
      return;
    }

    // FIXME: 강제로 answerId null로 설정하였는데, 기존 값이 있을 경우에는 그대로 사용하도록 수정 필요 (IFormApplication type 수정)
    const convertedAnswers = data.answers.flatMap((answer) => {
      if (answer.questionType === 'NARRATIVE') {
        return [
          {
            answerId: null,
            questionId: answer.questionId,
            content: answer.content,
            choiceId: null,
            questionType: 'NARRATIVE',
          } as ICreatedAnswer,
        ];
      } else if (answer.questionType === 'SELECTIVE') {
        return (
          answer.choiceIds?.map(
            (choiceId) =>
              ({
                answerId: null,
                questionId: answer.questionId,
                content: null,
                choiceId: choiceId,
                questionType: 'SELECTIVE',
              }) as ICreatedAnswer,
          ) || []
        );
      }
      return [];
    });

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
    toast({
      title: '입력을 다시 확인해주세요.',
      state: 'error',
    });
  };

  // Convert ICreatedApplication to IFormApplication
  const convertAnswerToFormAnswer = (
    application: ITempApplication,
  ): IFormAnswer[] => {
    const convertedFormAnswers: IFormAnswer[] = application.answers.reduce(
      (acc: IFormAnswer[], answer: ITempAnswer) => {
        if (answer.type === 'NARRATIVE') {
          // NARRATIVE 타입의 답변 변환
          const narrativeAnswer: IFormAnswer = {
            answerId: answer.answerId,
            content: (answer as ITempNarrativeAnswer).content,
            choiceIds: null,
            questionId: answer.questionId,
            questionType: 'NARRATIVE',
          };
          acc.push(narrativeAnswer);
        } else if (answer.type === 'SELECTIVE') {
          const selectiveAnswerIndex = acc.findIndex(
            (fa) =>
              fa.questionId === answer.questionId &&
              fa.questionType === 'SELECTIVE',
          );

          if (selectiveAnswerIndex !== -1) {
            acc[selectiveAnswerIndex].choiceIds?.push(
              (answer as ITempSelectiveAnswer).choiceId,
            );
          } else {
            const selectiveAnswer: IFormAnswer = {
              answerId: answer.answerId,
              content: null,
              choiceIds: [(answer as ITempSelectiveAnswer).choiceId],
              questionId: answer.questionId,
              questionType: 'SELECTIVE',
            };
            acc.push(selectiveAnswer);
          }
        }
        return acc;
      },
      [] as IFormAnswer[],
    );

    return convertedFormAnswers;
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

  if (applicationQuery.isFetching || recruitmentQuery.isFetching)
    return <Loading />;
  else if (recruitmentQuery.error || !recruitment) {
    printCustomError(recruitmentQuery.error, 'readRecruitmentByCode');
    return <Navigate to="/error" replace />;
  } else if (applicationQuery.isError) {
    printCustomError(applicationQuery.error, 'readApplication');

    return <Navigate to="/error" replace />;
  }

  return (
    <Container className="mx-auto w-[600px] py-24">
      <HeaderSection />

      <FormProvider {...methods}>
        <form className="pb-24">
          <section className="mt-6 flex flex-col gap-8">
            {recruitment.sections.map((section) => (
              <ApplySectionBox
                name={section.name}
                description={section.description}
              >
                <section className="flex h-fit flex-col gap-4">
                  {section.questions.map((question) => (
                    <RenderQuestion key={question.id} question={question} />
                  ))}
                </section>
              </ApplySectionBox>
            ))}
          </section>

          <FooterContainer className="flex w-full justify-end">
            <Button
              type="button"
              size="lg"
              onClick={methods.handleSubmit(onSubmit)}
            >
              제출하기
            </Button>
          </FooterContainer>
        </form>
      </FormProvider>
    </Container>
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
