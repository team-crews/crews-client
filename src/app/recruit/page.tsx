import Container from '../../components/shared/container.tsx';
import RecruitWaitPage from './[recruitment-id]/_components/recruit-wait/recruit-wait-page.tsx';
import { IProgress } from '../../lib/model/i-progress.ts';
import RecruitCompletePage from './_components/recruit-complete/recruit-complete-page.tsx';

const Page = () => {
  // const { readRecruitmentProgress } = useAdminApi();
  // const queryResults = useQuery({
  //   queryKey: ['recruitmentProgress'],
  //   queryFn: readRecruitmentProgress,
  // });

  return (
    <Container className="py-12">
      <RenderByProgress progress="COMPLETION" />
    </Container>
  );

  // return (
  //   <QueryWrapper
  //     queryResults={queryResults}
  //     queryFnName="readRecruitmentProgress"
  //   >
  //     {queryResults.data && (
  //       <Container className="py-12">
  //         <RenderByProgress progress={queryResults.data.recruitmentProgress} />
  //         <RenderByProgress progress="IN_PROGRESS" />
  //       </Container>
  //     )}
  //   </QueryWrapper>
  // );
};

const RenderByProgress = ({ progress }: { progress: IProgress }) => {
  /*
    FixMe
    - Component 내에 render 관련 함수 넣는거 권장되지 않는다네요 🤢
    - [참고](https://react.dev/learn/your-first-component#nesting-and-organizing-components)
   */

  if (progress === 'READY') return <div>지원서 생성중</div>;
  if (progress === 'IN_PROGRESS')
    return (
      <Container className="mx-auto w-[768px]">
        <RecruitWaitPage />
      </Container>
    );
  if (progress === 'COMPLETION')
    return (
      <Container className="mx-auto w-[768px]">
        <RecruitCompletePage />
      </Container>
    );
  if (progress === 'ANNOUNCED') return <div>지원서 알림 완료</div>;
};

export default Page;
