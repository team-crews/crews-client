import Container from '../../components/shared/container.tsx';
import RecruitWaitPage from './_components/recruit-wait/recruit-wait-page.tsx';
import RecruitCompletePage from './_components/recruit-complete/recruit-complete-page.tsx';
import RecruitMakePage from './_components/recruit-make/recruit-make-page.tsx';
import useAdminApi from '../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/shared/loading.tsx';
import { throwCustomError } from '../../lib/utils/error.ts';
import { z } from 'zod';
import { ProgressSchema } from '../../lib/types/schemas/progress-schema.ts';

const Page = () => {
  const { readRecruitmentProgress } = useAdminApi();
  const readQuery = useQuery({
    queryKey: ['recruitmentProgress'],
    queryFn: readRecruitmentProgress,
  });

  if (readQuery.isFetching || readQuery.isPending) return <Loading />;
  else if (readQuery.isSuccess)
    return (
      <Container className="mx-auto w-[600px] pt-16">
        <RenderByProgress progress={readQuery.data.recruitmentProgress} />
      </Container>
    );
  else throwCustomError(readQuery.error, 'readRecruitmentProgress');
};

const RenderByProgress = ({
  progress,
}: {
  progress: z.infer<typeof ProgressSchema>;
}) => {
  if (progress === 'READY') return <RecruitMakePage />;
  if (progress === 'IN_PROGRESS') return <RecruitWaitPage />;
  if (progress === 'COMPLETION' || progress === 'ANNOUNCED')
    return <RecruitCompletePage progress={progress} />;
};

export default Page;
