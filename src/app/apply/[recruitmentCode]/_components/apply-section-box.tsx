import { ISection } from '../../../../lib/model/i-section';
import React from 'react';

interface ApplySectionBoxProps extends Pick<ISection, 'name' | 'description'> {
  children?: React.ReactNode;
}

const ApplySectionBox = ({
  children,
  name,
  description,
}: ApplySectionBoxProps) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="flex h-fit w-full flex-col gap-1 bg-crews-b04 p-4">
        <p className="w-full bg-inherit text-base font-bold text-crews-w01">
          {name}
        </p>
        <p className="bg-inherit text-xs text-crews-w01">{description}</p>
      </div>

      <div className="flex h-fit w-full flex-col gap-4 bg-crews-b01 p-4">
        {children}
      </div>
    </div>
  );
};

export default ApplySectionBox;
