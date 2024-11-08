import { z } from 'zod';
import RecruitMetaBox from '../../../../components/recruitment-view/recruit-meta-box';
import SectionBoxes from '../../../../components/recruitment-view/section-boxes';
import Container from '../../../../components/shared/container';
import { RecruitmentSchema } from '../../../../lib/types/schemas/recruitment-schema';

interface InfoSectionProps {
  recruitment: z.infer<typeof RecruitmentSchema>;
}

const InfoSection = ({ recruitment }: InfoSectionProps) => {
  return (
    <Container className="flex w-[40rem] flex-col gap-8 py-4">
      <RecruitMetaBox
        title={recruitment.title}
        description={recruitment.description}
        deadline={recruitment.deadline}
      />
      <SectionBoxes sections={recruitment.sections} />
    </Container>
  );
};
export default InfoSection;
