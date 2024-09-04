import { IRecruitment } from '../../../../lib/model/i-recruitment.ts';
import Container from '../../../../components/shared/container.tsx';
import RecruitMetaBox from '../../../../components/recruitment-view/recruit-meta-box.tsx';
import SectionBoxes from '../../../../components/recruitment-view/section-boxes.tsx';

const InfoSection = ({ recruitment }: { recruitment: IRecruitment }) => {
  return (
    <Container className="flex flex-col gap-8 overflow-scroll py-8">
      <RecruitMetaBox {...recruitment} />
      <SectionBoxes sections={recruitment.sections} />
    </Container>
  );
};

export default InfoSection;
