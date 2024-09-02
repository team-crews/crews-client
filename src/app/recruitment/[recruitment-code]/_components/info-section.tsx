// import { useQuery } from '@tanstack/react-query';

// import { readRecruitmentByCode } from '../../../../apis/base-api';
// import { useParams } from 'react-router-dom';
import NarrativeBox from '../../../../components/shared/narrative-box';
import SectionBox from '../../../../components/shared/section-box';
import SelectiveBox from '../../../../components/shared/selective-box';
import { RECRUITMENT_MOCK } from '../../../../lib/mock';

const InfoSection = () => {
  //   const { 'recruitment-code': recruitmentCode } = useParams();

  const data = RECRUITMENT_MOCK;

  //   const { data } = useQuery({
  //     queryKey: ['readRecruitment'],
  //     queryFn: () => {
  //       readRecruitmentByCode(recruitmentCode || '');
  //     },
  //   });

  return (
    <section className="overflow-scroll">
      {data.sections.map((section) => (
        <SectionBox
          key={section.id}
          name={section.name}
          description={section.description}
        >
          <div className="flex flex-col gap-[1.5rem]">
            {section.questions.map((question) =>
              question.type === 'NARRATIVE' ? (
                <NarrativeBox key={question.id} question={question} />
              ) : (
                <SelectiveBox key={question.id} question={question} />
              ),
            )}
          </div>
        </SectionBox>
      ))}
    </section>
  );
};

export default InfoSection;
