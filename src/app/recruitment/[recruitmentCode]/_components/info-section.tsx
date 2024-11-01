import Container from '../../../../components/shared/container.tsx';
import RecruitMetaBox from '../../../../components/recruitment-view/recruit-meta-box.tsx';
import SectionBoxes from '../../../../components/recruitment-view/section-boxes.tsx';
import HeaderSection from './header-section.tsx';
import { z } from 'zod';
import { RecruitmentSchema } from '../../../../lib/types/schemas/recruitment-schema.ts';

const InfoSection = ({
  recruitment,
}: {
  recruitment: z.infer<typeof RecruitmentSchema>;
}) => {
  return (
    <Container className="flex flex-col gap-8 overflow-scroll py-8">
      <HeaderSection />
      <RecruitMetaBox {...recruitment} />
      <SectionBoxes sections={recruitment.sections} />
    </Container>
  );
};

export default InfoSection;
