import React from 'react';
import CircleCheckIcon from '../../../../../assets/icons/circle-check-icon.svg?react';
import CircleCheckEmptyIcon from '../../../../../assets/icons/circle-check-empty-icon.svg?react';
import { cn } from '../../../../../lib/utils/utils.ts';
import useDialog from '../../../../../hooks/use-dialog.ts';
import ApplicationDetailDialog from './application-detail-dialog.tsx';
import { z } from 'zod';
import { ProgressSchema } from '../../../../../lib/types/schemas/progress-schema.ts';
import { ApplicationOverviewSchema } from '../../../../../lib/types/schemas/application-schema.ts';

const OverviewCard = ({
  applicationOverview,
  progress,
  isPass,
  passId,
  unpassId,
}: {
  applicationOverview: z.infer<typeof ApplicationOverviewSchema>;
  progress: z.infer<typeof ProgressSchema>;
  isPass: boolean;
  passId: (id: number) => void;
  unpassId: (id: number) => void;
}) => {
  const handlePassClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    passId(applicationOverview.id);
  };

  const handleUnpassClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    unpassId(applicationOverview.id);
  };

  const dialogProps = useDialog();

  return (
    <>
      <div
        onClick={() => dialogProps.toggleOpen()}
        className={cn(
          'flex cursor-pointer items-center justify-between rounded-lg border border-crews-g02 bg-crews-w01 p-4 hover:bg-crews-g01',
          isPass && 'border-crews-b02 bg-crews-b02',
        )}
      >
        <div className="text-sm font-semibold text-crews-bk01">
          <p>{applicationOverview.studentNumber}</p>
          <p>{applicationOverview.name}</p>
          <p className="mt-1 text-xs text-crews-g05">
            {applicationOverview.major}
          </p>
        </div>
        <button
          disabled={progress === 'ANNOUNCED'}
          onClick={isPass ? handleUnpassClick : handlePassClick}
        >
          {isPass ? (
            <CircleCheckIcon className="h-4 w-4 text-crews-b05" />
          ) : (
            <CircleCheckEmptyIcon className="h-4 w-4 text-crews-g03" />
          )}
        </button>
      </div>
      {dialogProps.isOpen ? (
        <ApplicationDetailDialog
          applicationId={applicationOverview.id}
          {...dialogProps}
        />
      ) : null}
    </>
  );
};

export default OverviewCard;
