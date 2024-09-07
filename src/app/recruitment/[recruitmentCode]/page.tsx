import Container from '../../../components/shared/container.tsx';
import ApplyForm from './_components/apply-form.tsx';

import InfoSection from './_components/info-section.tsx';
import { readRecruitmentByCode } from '../../../apis/base-api.ts';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import Loading from '../../../components/shared/loading.tsx';
import { printCustomError } from '../../../lib/utils/error.ts';

const Page = () => {
  const { recruitmentCode } = useParams<{ recruitmentCode: string }>();

  const readQuery = useQuery({
    queryKey: ['recruitmentByCode'],
    queryFn: () => readRecruitmentByCode(recruitmentCode!),
  });

  if (readQuery.isFetching) return <Loading />;
  else if (readQuery.isError || !readQuery.data) {
    printCustomError(readQuery.error, 'readQuery');
    return <Navigate to="/error" replace />;
  }
  return (
    <Container className="flex flex-row justify-around">
      <section className="flex max-w-[375px] flex-grow items-center">
        <ApplyForm />
      </section>

      <section className="w-[600px]">
        <InfoSection recruitment={readQuery.data} />
      </section>
    </Container>
  );
};

export default Page;
