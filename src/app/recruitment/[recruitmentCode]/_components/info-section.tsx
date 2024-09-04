import { useQuery } from '@tanstack/react-query';

import { readRecruitmentByCode } from '../../../../apis/base-api';
import { useNavigate, useParams } from 'react-router-dom';
import NarrativeBox from '../../../../components/shared/narrative-box';
import SectionBox from '../../../../components/shared/section-box';
import SelectiveBox from '../../../../components/shared/selective-box';
import { QuestionType } from '../../../../lib/enums';
import handleError from '../../../../lib/utils/error';
import { useToast } from '../../../../hooks/use-toast';
import { IQuestion } from '../../../../lib/model/i-section.ts';

const InfoSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { 'recruitment-code': recruitmentCode } = useParams();

  const { data } = useQuery({
    queryKey: ['readRecruitment', recruitmentCode],
    queryFn: async () => {
      try {
        return await readRecruitmentByCode(recruitmentCode || '');
      } catch (e) {
        handleError(e, 'readRecruitmentByCode', 'PRINT');

        toast({
          title: '모집 정보를 불러오는 중 문제가 발생했습니다.',
          state: 'error',
        });

        navigate('/');
      }
    },

    enabled: !!recruitmentCode,
  });

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
