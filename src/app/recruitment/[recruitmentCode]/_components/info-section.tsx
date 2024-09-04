import NarrativeBox from '../../../../components/shared/narrative-box';
import SectionBox from '../../../../components/shared/section-box';
import SelectiveBox from '../../../../components/shared/selective-box';
import { QuestionType } from '../../../../lib/enums';

import { IQuestion } from '../../../../lib/model/i-section.ts';
import { IRecruitment } from '../../../../lib/model/i-recruitment.ts';

interface InfoSectionProps {
  recruitment?: IRecruitment;
}

const InfoSection = ({ recruitment }: InfoSectionProps) => {
  return (
    <section className="overflow-scroll px-[1rem]">
      <div className="flex flex-col gap-[1.5rem]">
        {recruitment?.sections.map((section) => (
          <SectionBox
            key={section.id}
            name={section.name}
            description={section.description}
          >
            <div className="flex flex-col gap-[1.5rem]">
              {section.questions.map((question) => (
                <RenderQuestion key={question.id} question={question} />
              ))}
            </div>
          </SectionBox>
        ))}
      </div>
    </section>
  );
};

// 질문 타입별 확장성을 위한 컴포넌트 렌더링
const RenderQuestion = ({ question }: { question: IQuestion }) => {
  switch (question.type) {
    case QuestionType.NARRATIVE:
      return <NarrativeBox question={question} />;
    case QuestionType.SELECTIVE:
      return <SelectiveBox key={question.id} question={question} />;
    default:
      return null;
  }
};

export default InfoSection;
