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
  else if (readQuery.isError) {
    printCustomError(readQuery.error, 'readQuery');
    return <Navigate to="/error" replace />;
  }

  return (
    <Container className="flex flex-col md:flex-row">
      <section className="mt-14 flex flex-1 items-center justify-center md:mt-0">
        <div className="mb-10 w-full max-w-[375px] p-2 sm:p-0">
          <ApplyForm />
        </div>
      </section>
      <section className="my-0 w-full flex-1 overflow-scroll md:my-[6rem]">
        <InfoSection recruitment={readQuery.data} />
      </section>
    </Container>
  );
};

export default Page;
