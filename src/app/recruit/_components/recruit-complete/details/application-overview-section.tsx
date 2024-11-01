import OverviewCard from './overveiw-card.tsx';
import { z } from 'zod';
import { ProgressSchema } from '../../../../../lib/types/schemas/progress-schema.ts';
import { ApplicationOverviewSchema } from '../../../../../lib/types/schemas/application-schema.ts';

type Props = {
  progress: z.infer<typeof ProgressSchema>;
  applicationOverviews: z.infer<typeof ApplicationOverviewSchema>[];
  passedApplicationIds: number[];
  passId: (id: number) => void;
  unpassId: (id: number) => void;
};

const ApplicationOverviewSection = ({
  applicationOverviews,
  passedApplicationIds,
  ...props
}: Props) => {
  return (
    <section>
      <p className="font-semibold text-crews-bk01">
        지원서 리스트{' '}
        <span className="text-crews-b05">{applicationOverviews.length}</span>
      </p>
      <div className="my-4 grid grid-cols-4 gap-4">
        {applicationOverviews.map((item) => (
          <OverviewCard
            key={item.id}
            applicationOverview={item}
            isPass={passedApplicationIds.includes(item.id)}
            {...props}
          />
        ))}
      </div>
    </section>
  );
};

export default ApplicationOverviewSection;
