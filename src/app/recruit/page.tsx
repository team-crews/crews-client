import Container from '../../components/shared/container.tsx';
import RecruitWaitPage from './_components/recruit-wait/recruit-wait-page.tsx';
import { IProgress } from '../../lib/model/i-progress.ts';
import RecruitCompletePage from './_components/recruit-complete/recruit-complete-page.tsx';
import RecruitMakePage from './_components/recruit-make/recruit-make-page.tsx';
import useAdminApi from '../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/shared/loading.tsx';
import { printCustomError } from '../../lib/utils/error.ts';
import { Navigate } from 'react-router-dom';

const Page = () => {
  const { readRecruitmentProgress } = useAdminApi();
  const readQuery = useQuery({
    queryKey: ['recruitmentProgress'],
    queryFn: readRecruitmentProgress,
  });

  if (readQuery.isFetching) return <Loading />;
  else if (readQuery.isError || !readQuery.data) {
    printCustomError(readQuery.error, 'readQuery');
    return <Navigate to="/error" replace />;
  }
  return (
    <Container className="mx-auto w-[630px] py-24">
      <RenderByProgress progress={readQuery.data.recruitmentProgress} />
    </Container>
  );
};

const RenderByProgress = ({ progress }: { progress: IProgress }) => {
  if (progress === 'READY') return <RecruitMakePage />;
  if (progress === 'IN_PROGRESS') return <RecruitWaitPage />;
  if (progress === 'COMPLETION' || progress === 'ANNOUNCED')
    return <RecruitCompletePage progress={progress} />;
};

export default Page;
