import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  readRecruitmentByCode,
  readRecruitmentByTitle,
} from '../../../apis/base-api';
import { useQuery } from '@tanstack/react-query';
import { throwCustomError } from '../../../lib/utils/error';
import { Button } from '../../../components/shadcn/button';
import CrewsFooter from '../../../components/molecule/crews-footer';

import useDialog from '../../../hooks/use-dialog';
import PreviewDialog from './_components/preview-dialog';
import Container from '../../../components/atom/container.tsx';
import HeaderSection from './_components/header-section.tsx';
import RecruitMetaBox from '../../../components/recruitment-view/recruit-meta-box.tsx';
import SectionBoxes from '../../../components/recruitment-view/section-boxes.tsx';

function Loading() {
  return null;
}

const Page = () => {
  const navigate = useNavigate();
  const dialogReturns = useDialog();

  const [searchParams] = useSearchParams();
  const title = searchParams.get('title') || '';
  const recruitmentCode = searchParams.get('recruitmentCode') || '';

  const readQuery = useQuery({
    queryKey: ['recruitmentSearchBy', title],
    queryFn: () => {
      if (title) return readRecruitmentByTitle(title);
      else return readRecruitmentByCode(recruitmentCode);
    },
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
      <Container className="mx-auto flex h-auto max-w-[640px] flex-col gap-8 px-[1rem] py-8 pt-24">
        <HeaderSection />

        <RecruitMetaBox
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
          <SectionBoxes sections={readQuery.data.sections} />
        </PreviewDialog>
      </Container>
    );
  } else throwCustomError(readQuery.error, 'readRecruitmentProgress');
};

export default Page;
