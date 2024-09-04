import HeaderSection from './header-section.tsx';
import Container from '../../../../components/shared/container.tsx';
import ApplicantSection from './applicant-section.tsx';
import DeadlineSection from './deadline-section.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Loading from '../../../../components/shared/loading.tsx';
import { printCustomError } from '../../../../lib/utils/error.ts';
import { Navigate } from 'react-router-dom';
import FooterSection from './footer-section.tsx';

const RecruitWaitPage = () => {
  const [recruiting, setRecruiting] = useState<boolean>(true);
  const stopRecruiting = () => setRecruiting(false);

  const { readRecruitmentInProgressDetail } = useAdminApi();
  const readQuery = useQuery({
    queryKey: ['recruitmentInProgressDetail'],
    queryFn: readRecruitmentInProgressDetail,
    refetchInterval: 3600000,
    refetchIntervalInBackground: true,
    enabled: recruiting,
  });

  if (readQuery.isFetching) return <Loading />;
  else if (readQuery.isError || !readQuery.data) {
    printCustomError(readQuery.error, 'readQuery');
    return <Navigate to="/error" replace />;
  }
  return (
    <Container className="flex flex-col">
      <HeaderSection />
      <div className="my-8 flex flex-1 flex-col justify-center gap-12">
        <ApplicantSection applicationCount={readQuery.data.applicationCount} />
        <DeadlineSection
          recruiting={recruiting}
          stopRecruiting={stopRecruiting}
          deadline={new Date(readQuery.data.deadline)}
        />
      </div>
      <FooterSection
        recruiting={recruiting}
        recruitmentCode={readQuery.data.code}
        deadline={readQuery.data.deadline}
      />
    </Container>
  );
};

export default RecruitWaitPage;
