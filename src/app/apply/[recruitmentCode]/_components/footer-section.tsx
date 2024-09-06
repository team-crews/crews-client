import FooterContainer from '../../../../components/shared/footer-container.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import { ICreatedAnswer } from '../../../../lib/model/i-application.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';
import { IFormApplication } from '../page.tsx';

const FooterSection = () => {
  const onSubmit = async (data: IFormApplication) => {
    const choiceValidate = validateChoices(data.answers);

    if (!choiceValidate) {
      onFormError();
      return;
    }

    /*
      FIXME
      - 강제로 answerId null 로 설정하였는데, 기존 값이 있을 경우에는 그대로 사용하도록 수정 필요 (IFormApplication type 수정)
     */
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

  return (
    <FooterContainer className="flex w-full justify-end">
      <Button type="submit" size="lg">
        제출하기
      </Button>
    </FooterContainer>
  );
};

export default FooterSection;
