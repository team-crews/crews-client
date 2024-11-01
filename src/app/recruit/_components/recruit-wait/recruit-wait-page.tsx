import HeaderSection from './header-section.tsx';
import ApplicantSection from './applicant-section.tsx';
import DeadlineSection from './deadline-section.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Loading from '../../../../components/shared/loading.tsx';
import { throwCustomError } from '../../../../lib/utils/error.ts';
import Container from '../../../../components/shared/container.tsx';
import FooterSection from './footer-section.tsx';
import CopySection from './copy-section.tsx';

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

  if (readQuery.isFetching || readQuery.isPending) return <Loading />;
  else if (readQuery.isSuccess)
    return (
      <Container className="flex h-auto flex-col gap-8 py-8">
        <HeaderSection />
        <div className="my-8 flex flex-col justify-center gap-12">
          <CopySection recruitmentCode={readQuery.data.code} />
          <ApplicantSection
            applicationCount={readQuery.data.applicationCount}
          />
          <DeadlineSection
            recruiting={recruiting}
            stopRecruiting={stopRecruiting}
            deadline={readQuery.data.deadline}
          />
        </div>
        <FooterSection
          recruiting={recruiting}
          deadline={readQuery.data.deadline}
        />
      </Container>
    );
  else throwCustomError(readQuery.error, 'readRecruitmentInProgressDetail');
};

export default RecruitWaitPage;
