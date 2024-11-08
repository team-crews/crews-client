import { useNavigate, useSearchParams } from 'react-router-dom';
import { readRecruitmentSearchBy } from '../../../apis/base-api';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/shared/loading';
import { printCustomError, throwCustomError } from '../../../lib/utils/error';
import Container from '../../../components/shared/container';
import { Button } from '../../../components/shadcn/button';

import InfoSection from './_components/info-section';

import ViewSection from './_components/view-section';
import CrewsFooter from '../../../components/molecule/crews-footer';

import useDialog from '../../../hooks/use-dialog';
import PreviewDialog from './_components/preview-dialog';

const Page = () => {
  const navigate = useNavigate();
  const dialogReturns = useDialog();

  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');

  const readQuery = useQuery({
    queryKey: ['recruitmentSearchBy', title],
    queryFn: () => readRecruitmentSearchBy(title!),
  });

  const handlePreviewClick = () => {
    dialogReturns.toggleOpen();
  };

  const handleApplyClick = () => {
    navigate('/apply/' + readQuery.data?.code);
  };

  if (readQuery.isFetching || readQuery.isPending) return <Loading />;
  else if (readQuery.isSuccess) {
    return (
      <Container className="flex h-auto w-full justify-center gap-4 overflow-scroll px-4 pb-8 pt-16">
        <ViewSection
          title={readQuery.data.title}
          description={readQuery.data.description}
          deadline={readQuery.data.deadline}
        />

        <CrewsFooter>
          <Button onClick={handlePreviewClick} size="lg" variant="black">
            지원서 미리보기
          </Button>
          <Button onClick={handleApplyClick} size="lg">
            지원하기
          </Button>
        </CrewsFooter>

        <PreviewDialog {...dialogReturns}>
          <InfoSection sections={readQuery.data.sections} />
        </PreviewDialog>
      </Container>
    );
  } else if (printCustomError(readQuery.error, 'readQuery') === 404) {
    return (
      <Container className="flex flex-col items-center justify-center gap-2">
        <p className="text-xl font-semibold text-crews-b05">
          존재하지 않는 모집 공고입니다 😂
        </p>
        <p>모집 공고 제목을 다시 확인해주세요.</p>
        <Button onClick={() => navigate(-1)} size="sm">
          돌아가기
        </Button>
      </Container>
    );
  } else throwCustomError(readQuery.error, 'readRecruitmentProgress');
};

export default Page;
