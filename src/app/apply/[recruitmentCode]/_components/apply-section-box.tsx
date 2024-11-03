import { cn } from '../../../../lib/utils/utils.ts';
import React from 'react';
import { z } from 'zod';
import { SectionSchema } from '../../../../lib/types/schemas/section-schema.ts';
import ReadonlyTextarea from '../../../../components/atom/readonly-textarea.tsx';

interface ApplySectionBoxProps
  extends Pick<z.infer<typeof SectionSchema>, 'name' | 'description'> {
  children?: React.ReactNode;
  isSelectable?: boolean;
}

const ApplySectionBox = ({
  children,
  name,
  description,
  isSelectable = false,
}: ApplySectionBoxProps) => {
  return (
    <section
      className={cn('overflow-hidden rounded-xl', {
        'rounded-tl-none': isSelectable,
        '': !isSelectable,
      })}
    >
      <div className="flex h-fit w-full flex-col gap-1 bg-crews-b04 p-4">
        <p className="w-full bg-inherit text-base font-bold text-crews-w01">
          {name}
        </p>
        <ReadonlyTextarea name="WINTER_IS_GOD" value={description} />
      </div>
      <div className="flex h-fit w-full flex-col gap-4 bg-crews-b01 p-4">
        {children}
      </div>
    </section>
  );
};

export default ApplySectionBox;
