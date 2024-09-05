import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

import Container from '../../../components/shared/container';
import useApplicantApi from '../../../apis/applicant-api';
import handleError from '../../../lib/utils/error';
import Loading from '../../../components/shared/loading';
import { readRecruitmentByCode } from '../../../apis/base-api';
import ApplySectionBox from './_components/apply-section-box';
import ApplyNarrativeBox from './_components/apply-narrative-box';
import ApplySelectiveBox from './_components/apply-selective-box';
import { QuestionType } from '../../../lib/enums';
import { IQuestion } from '../../../lib/model/i-section';

const Page = () => {
  const { recruitmentCode } = useParams<{ recruitmentCode: string }>();

  const { readApplication } = useApplicantApi(recruitmentCode!);

  const { data: recruitment, ...recruitmentQuery } = useQuery({
    queryKey: ['recruitmentByCode'],
    queryFn: () => readRecruitmentByCode(recruitmentCode!),
    enabled: !!recruitmentCode,
  });

  /** 저장된 값 없을 시 default로 set 하도록 에러 핸들링 */
  const { data: application, ...applicationQuery } = useQuery({
    queryKey: ['readApplication', recruitmentCode],
    queryFn: async () => {
      const response = await readApplication();
      //TODO: add 204 exception logic
      return response;
    },
    enabled: !!recruitmentCode,
  });

  if (applicationQuery.isFetching || recruitmentQuery.isFetching)
    return <Loading />;
  else if (recruitmentQuery.error || !recruitment) {
    handleError(recruitmentQuery.error, 'readRecruitmentByCode');
    return <Navigate to="/error" replace />;
  } else if (applicationQuery.isError || !application) {
    handleError(applicationQuery.error, 'readApplication');

    // 저장된 지원 정보가 없을 시 404 (추후 status 변경 예정)
    return <Navigate to="/error" replace />;
  }

  return (
    <Container className="mx-auto my-24 w-[630px]">
      <div className="flex flex-col gap-[1.5rem]">
        {recruitment.sections.map((section) => (
          <ApplySectionBox
            name={section.name}
            description={section.description}
          >
            <div className="flex flex-col gap-[1.5rem]">
              {section.questions.map((question) => (
                <RenderQuestion key={question.id} question={question} />
              ))}
            </div>
          </ApplySectionBox>
        ))}
      </div>
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
