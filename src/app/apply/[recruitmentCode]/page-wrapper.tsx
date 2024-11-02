import { useParams } from 'react-router-dom';
import useApplicantApi from '../../../apis/applicant-api.ts';
import { useQuery } from '@tanstack/react-query';
import { readRecruitmentByCode } from '../../../apis/base-api.ts';
import Loading from '../../../components/shared/loading.tsx';
import Container from '../../../components/shared/container.tsx';
import { throwCustomError } from '../../../lib/utils/error.ts';
import Page from './page.tsx';

const PageWrapper = () => {
  const { recruitmentCode } = useParams<{ recruitmentCode: string }>();
  const { readApplication } = useApplicantApi(recruitmentCode!);

  const recruitmentQuery = useQuery({
    queryKey: ['recruitmentByCode', recruitmentCode],
    queryFn: () => readRecruitmentByCode(recruitmentCode!),
  });

  const applicationQuery = useQuery({
    queryKey: ['readApplication', recruitmentCode],
    queryFn: readApplication,
  });

  if (
    applicationQuery.isFetching ||
    applicationQuery.isPending ||
    recruitmentQuery.isPending ||
    recruitmentQuery.isFetching
  )
    return <Loading />;
  else if (applicationQuery.isSuccess && recruitmentQuery.isSuccess)
    return (
      <Container className="mx-auto w-[600px] pt-16">
        <Page
          recruitment={recruitmentQuery.data}
          application={applicationQuery.data}
        />
      </Container>
    );
  else
    throwCustomError(
      recruitmentQuery.error || applicationQuery.error,
      'readRecruitmentByCode or readApplication',
    );
};

export default PageWrapper;
