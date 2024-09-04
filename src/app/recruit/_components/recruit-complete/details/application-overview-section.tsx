import { IApplicationOverview } from '../../../../../lib/model/i-application.ts';
import OverviewCard from './overveiw-card.tsx';
import { IProgress } from '../../../../../lib/model/i-progress.ts';

type Props = {
  progress: IProgress;
  applicationOverviews: IApplicationOverview[];
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
