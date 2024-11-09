import { z } from 'zod';

import SectionBoxes from '../../../../components/recruitment-view/section-boxes';
import { SectionSchema } from '../../../../lib/schemas/section-schema.ts';
import Container from '../../../../components/atom/container.tsx';

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
