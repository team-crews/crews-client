import Container from '../../../components/shared/container.tsx';
import ApplyForm from './_components/apply-form.tsx';
import { Skeleton } from '../../../components/shared/skeleton.tsx';
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
  console.log(readQuery.data);
  return (
    <Container className="0 flex gap-10">
      <section className="flex flex-grow items-center justify-center">
        <div className="mb-10 w-full max-w-[375px]">
          <ApplyForm />
        </div>
      </section>
      <section className="overflow-scroll">
        <Skeleton className="mx-auto mb-12 mt-[120px] h-[500px] w-[600px]" />
        <Skeleton className="mx-auto mb-12 h-[300px] w-[600px]" />
        <Skeleton className="mx-auto h-96 w-[600px]" />
      </section>
    </Container>
  );
};

export default Page;
