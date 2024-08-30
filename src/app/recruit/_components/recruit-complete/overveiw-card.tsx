import { IApplicationOverview } from '../../../../lib/model/i-application.ts';
import CircleCheckIcon from '../../../../assets/icons/circle-check-icon.svg?react';
import CircleCheckEmptyIcon from '../../../../assets/icons/circle-check-empty-icon.svg?react';
import { cn } from '../../../../lib/utils.ts';

const OverviewCard = ({
  applicationOverview,
}: {
  applicationOverview: IApplicationOverview;
}) => {
  const isPass = applicationOverview.outcome === 'PASS';
  const bgColor: string = isPass
    ? 'bg-crews-b02 border-crews-b02'
    : 'bg-crews-w01 border-crews-g02';

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border p-4',
        bgColor,
      )}
    >
      <div>
        <p className="text-sm font-semibold text-crews-bk01">
          {applicationOverview.studentNumber}
        </p>
        <p className="text-sm font-semibold text-crews-bk01">
          {applicationOverview.name}
        </p>
        <p className="mt-1 text-xs text-crews-g05">
          {applicationOverview.major}
        </p>
      </div>
      <button>
        {isPass ? (
          <CircleCheckIcon className="h-4 w-4 text-crews-b05" />
        ) : (
          <CircleCheckEmptyIcon className="h-4 w-4 text-crews-g03" />
        )}
      </button>
    </div>
  );
};

export default OverviewCard;
