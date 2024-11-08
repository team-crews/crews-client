import { z } from 'zod';
import { RecruitmentSchema } from '../../../../lib/types/schemas/recruitment-schema';
import RecruitMetaBox from '../../../../components/recruitment-view/recruit-meta-box';
import Container from '../../../../components/shared/container';

interface ViewSectionProps
  extends Pick<
    z.infer<typeof RecruitmentSchema>,
    'title' | 'description' | 'deadline'
  > {}

const ViewSection = ({ title, description, deadline }: ViewSectionProps) => {
  return (
    <Container className="flex w-[44rem] flex-col gap-8 overflow-scroll py-4">
      <RecruitMetaBox
        title={title}
        description={description}
        deadline={deadline}
      />
    </Container>
  );
};

export default ViewSection;
