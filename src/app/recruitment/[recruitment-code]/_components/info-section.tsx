import { useQuery } from '@tanstack/react-query';

import { readRecruitmentByCode } from '../../../../apis/base-api';
import { useParams } from 'react-router-dom';
import NarrativeBox from '../../../../components/shared/narrative-box';
import SectionBox from '../../../../components/shared/section-box';
import SelectiveBox from '../../../../components/shared/selective-box';
import { QuestionType } from '../../../../lib/enums';
import { IQuestion } from '../../../../lib/model/i-section';

const InfoSection = () => {
  const { 'recruitment-code': recruitmentCode } = useParams();

  const { data } = useQuery({
    queryKey: ['readRecruitment', recruitmentCode],
    queryFn: () => readRecruitmentByCode(recruitmentCode || ''),
    enabled: !!recruitmentCode,
  });

  // 질문 타입별 확장성을 위한 컴포넌트 렌더링
  const renderQuestionComponent = (question: IQuestion) => {
    switch (question.type) {
      case QuestionType.NARRATIVE:
        return <NarrativeBox question={question} />;
      case QuestionType.SELECTIVE:
        return <SelectiveBox key={question.id} question={question} />;
      default:
        return null;
    }
  };

  return (
    <section className="overflow-scroll px-[1rem]">
      <div className="flex flex-col gap-[1.5rem]">
        {data?.sections.map((section) => (
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
      </div>
    </section>
  );
};

export default InfoSection;
