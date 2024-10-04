import Container from '../../../components/shared/container.tsx';
import ApplyForm from './_components/apply-form.tsx';

import InfoSection from './_components/info-section.tsx';
import { readRecruitmentByCode } from '../../../apis/base-api.ts';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/shared/loading.tsx';
import { printCustomError } from '../../../lib/utils/error.ts';
import { Button } from '../../../components/shadcn/button.tsx';

const Page = () => {
  const { recruitmentCode } = useParams<{ recruitmentCode: string }>();

  const readQuery = useQuery({
    queryKey: ['recruitmentByCode'],
    queryFn: () => readRecruitmentByCode(recruitmentCode!),
  });

  const navigate = useNavigate();

  if (readQuery.isFetching) return <Loading />;
  else if (readQuery.isError || !readQuery.data) {
    if (printCustomError(readQuery.error, 'readQuery') === 404)
      return (
        <Container className="flex flex-col items-center justify-center gap-2">
          <p className="text-xl font-semibold text-crews-b05">
            존재하지 않는 모집 코드입니다 😂
          </p>
          <p>모집 코드를 다시 확인해주세요.</p>
          <Button onClick={() => navigate(-1)} size="sm">
            돌아가기
          </Button>
        </Container>
      );
    else return <Navigate to="/error" replace />;
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
