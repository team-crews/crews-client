import { ISection } from '../../../../lib/model/i-section';
import { cn } from '../../../../lib/utils';

interface ApplySectionBoxProps extends Pick<ISection, 'name' | 'description'> {
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
    <section>
      <div
        className={cn('flex w-full flex-col bg-crews-b04 p-[1.25rem]', {
          'rounded-tr-[0.625rem]': isSelectable,
          'rounded-t-[0.625rem]': !isSelectable,
        })}
      >
        <div className="flex items-center justify-between">
          <div className="bg-crews-b04 font-pretendard text-[1.375rem] font-bold text-crews-w01">
            {name}
          </div>
        </div>
        <div className="bg-crews-b04 font-pretendard text-[0.875rem] text-crews-w01">
          {description}
        </div>
      </div>
      <div className="rounded-b-[0.625rem] bg-crews-b01 px-[1.25rem] py-[1.5rem]">
        {children}
      </div>
    </section>
  );
};

export default ApplySectionBox;
