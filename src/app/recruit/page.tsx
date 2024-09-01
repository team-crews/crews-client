import Container from '../../components/shared/container.tsx';
import RecruitWaitPage from './_components/recruit-wait/recruit-wait-page.tsx';
import { IProgress } from '../../lib/model/i-progress.ts';
import RecruitCompletePage from './_components/recruit-complete/recruit-complete-page.tsx';
import RecruitMakePage from './_components/recruit-make/recruit-make-page.tsx';
import QueryWrapper from '../../components/wrapper/query-wrapper.tsx';
import useAdminApi from '../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const { readRecruitmentProgress } = useAdminApi();
  const queryResults = useQuery({
    queryKey: ['recruitmentProgress'],
    queryFn: readRecruitmentProgress,
  });

  return (
    <QueryWrapper
      queryResults={queryResults}
      queryFnName="readRecruitmentProgress"
    >
      {queryResults.data && (
        <Container className="mx-auto w-[768px] py-24">
          <RenderByProgress progress={queryResults.data.recruitmentProgress} />
        </Container>
      )}
    </QueryWrapper>
  );
};

const RenderByProgress = ({ progress }: { progress: IProgress }) => {
  /*
    FixMe
    - Component 내에 render 관련 함수 넣는거 권장되지 않는다네요 🤢
    - [참고](https://react.dev/learn/your-first-component#nesting-and-organizing-components)
   */

  if (progress === 'READY') return <RecruitMakePage />;
  if (progress === 'IN_PROGRESS') return <RecruitWaitPage />;
  if (progress === 'COMPLETION') return <RecruitCompletePage />;
  if (progress === 'ANNOUNCED') return <div>지원서 알림 완료</div>;
};

export default Page;
