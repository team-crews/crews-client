import Container from '../../../../components/atom/container.tsx';
import HeaderSection from './header-section.tsx';
import CompetitionRateSection from './details/competition-rate-section.tsx';
import ApplicationOverviewSection from './details/application-overview-section.tsx';
import { useQuery } from '@tanstack/react-query';
import useAdminApi from '../../../../apis/admin-api.ts';
import usePassedApplicationIds from './details/usePassedApplicationIds.ts';
import Loading from '../../../../components/atom/loading.tsx';
import FooterSection from './footer-section.tsx';
import { throwCustomError } from '../../../../lib/utils/error.ts';
import { z } from 'zod';
import { ProgressSchema } from '../../../../lib/schemas/progress-schema.ts';

const RecruitCompletePage = ({
  progress,
}: {
  progress: z.infer<typeof ProgressSchema>;
}) => {
  const { readApplicationOverviews } = useAdminApi();
  const readQuery = useQuery({
    queryKey: ['applicationOverviews'],
    queryFn: readApplicationOverviews,
  });

  const { passApplicationIds, passId, unpassId } = usePassedApplicationIds(
    readQuery.data ?? null,
  );

  if (readQuery.isFetching || readQuery.isPending || !passApplicationIds)
    return <Loading />;
  else if (readQuery.isSuccess)
    return (
      <Container className="flex h-auto flex-col gap-8 py-8">
        <HeaderSection />
        <div className="flex flex-col gap-8">
          <CompetitionRateSection
            passedNumber={passApplicationIds.length}
            totalNumber={readQuery.data.length}
          />
          <ApplicationOverviewSection
            progress={progress}
            applicationOverviews={readQuery.data}
            passedApplicationIds={passApplicationIds}
            passId={passId}
            unpassId={unpassId}
          />
        </div>
        <FooterSection
          progress={progress}
          passApplicationIds={passApplicationIds}
        />
      </Container>
    );
  else throwCustomError(readQuery.error, 'readApplicationOverviews');
};

export default RecruitCompletePage;
