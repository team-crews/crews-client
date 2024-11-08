import { z } from 'zod';

import SectionBoxes from '../../../../components/recruitment-view/section-boxes';
import Container from '../../../../components/shared/container';

import { SectionSchema } from '../../../../lib/types/schemas/section-schema';

interface InfoSectionProps {
  sections: z.infer<typeof SectionSchema>[];
}

const InfoSection = ({ sections }: InfoSectionProps) => {
  return (
    <Container className="flex w-[44rem] flex-col gap-8 py-4">
      <SectionBoxes sections={sections} />
    </Container>
  );
};
export default InfoSection;
