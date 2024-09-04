import Container from '../../../../components/shared/container.tsx';
import HeaderSection from './header-section.tsx';
import CompetitionRateSection from './details/competition-rate-section.tsx';
import ApplicationOverviewSection from './details/application-overview-section.tsx';
import { useQuery } from '@tanstack/react-query';
import useAdminApi from '../../../../apis/admin-api.ts';
import usePassedApplicationIds from './details/usePassedApplicationIds.ts';
import { IProgress } from '../../../../lib/model/i-progress.ts';
import Loading from '../../../../components/shared/loading.tsx';
import FooterSection from './footer-section.tsx';

const RecruitCompletePage = ({ progress }: { progress: IProgress }) => {
  const { readApplicationOverviews } = useAdminApi();
  const queryResults = useQuery({
    queryKey: ['applicationOverviews'],
    queryFn: readApplicationOverviews,
  });

  const { passApplicationIds, passId, unpassId } = usePassedApplicationIds(
    queryResults.data ?? null,
  );

  if (queryResults.isFetching || !passApplicationIds || !queryResults.data)
    return <Loading />;
  else
    return (
      <Container>
        <HeaderSection />
        <div className="my-8 flex flex-col gap-8">
          <CompetitionRateSection
            passedNumber={passApplicationIds.length}
            totalNumber={queryResults.data.length}
          />
          <ApplicationOverviewSection
            progress={progress}
            applicationOverviews={queryResults.data}
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
};

export default RecruitCompletePage;
