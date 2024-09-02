// import { useQuery } from '@tanstack/react-query';

// import { readRecruitmentByCode } from '../../../../apis/base-api';
// import { useParams } from 'react-router-dom';
// import { Controller, useForm } from 'react-hook-form';
import NarrativeBox from '../../../../components/shared/narrative-box';
import SectionBox from '../../../../components/shared/section-box';
import SelectiveBox from '../../../../components/shared/selective-box';
import { QuestionType } from '../../../../lib/enums';
import { RECRUITMENT_MOCK } from '../../../../lib/mock';
import { IQuestion } from '../../../../lib/model/i-section';

const InfoSection = () => {
  //   const { 'recruitment-code': recruitmentCode } = useParams();

  const data = RECRUITMENT_MOCK;

  //   const { data } = useQuery({
  //     queryKey: ['readRecruitment'],
  //     queryFn: () => {
  //       readRecruitmentByCode(recruitmentCode || '');
  //     },
  //   });
  // react-hook-form을 사용하여 폼 상태 관리

  // const {
  //   control,
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     studentNumber: '',
  //     major: '',
  //     name: '',
  //     answers: RECRUITMENT_MOCK.sections.flatMap((section) =>
  //       section.questions.map((question) => ({
  //         questionId: question.id,
  //         content: '',
  //         choiceId: null,
  //         type: question.type,
  //       })),
  //     ),
  //   },
  // });

  // 질문 타입별 확장성을 위한 컴포넌트 렌더링
  const renderQuestionComponent = (question: IQuestion) => {
    switch (question.type) {
      case QuestionType.NARRATIVE:
        return <NarrativeBox question={question} isViewOnly={false} />;
      case QuestionType.SELECTIVE:
        return <SelectiveBox key={question.id} question={question} />;
      default:
        return null;
    }
  };

  return (
    <section className="my-[6rem] overflow-scroll px-[1rem]">
      <div className="flex flex-col gap-[1.5rem]">
        <form
        // onSubmit={handleSubmit((data) => {
        //   console.log(data);
        // })}
        >
          {data.sections.map((section) => (
            <SectionBox
              key={section.id}
              name={section.name}
              description={section.description}
            >
              <div className="flex flex-col gap-[1.5rem]">
                {section.questions.map((question) =>
                  renderQuestionComponent(question),
                )}
              </div>
            </SectionBox>
          ))}
          <button type="submit">제출</button>
        </form>
      </div>
    </section>
  );
};

export default InfoSection;
