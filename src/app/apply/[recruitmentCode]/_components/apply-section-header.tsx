import { ISection } from '../../../../lib/model/i-section';
import { cn } from '../../../../lib/utils';
import { SHARED_SECTION_INDEX } from '../page';

interface ApplySectionHeaderProps {
  sections: ISection[];
  selectionIndex: number;
  handleSelectionChange: (index: number) => void;
}

const ApplySectionHeader = ({
  sections,
  selectionIndex,
  handleSelectionChange,
}: ApplySectionHeaderProps) => {
  return (
    <div className="flex w-full gap-[0.5rem]">
      {sections.map((section, index) => {
        if (index === SHARED_SECTION_INDEX) return null;

        return (
          <div
            key={section.id}
            className={cn(
              'cursor-pointer rounded-t-[0.625rem] bg-crews-b03 px-[0.75rem] py-[0.5rem] font-pretendard text-[1rem] font-semibold text-crews-w01',
              {
                'bg-crews-b04': selectionIndex === index,
              },
            )}
            onClick={() => handleSelectionChange(index)}
          >
            {section.name}
          </div>
        );
      })}
    </div>
  );
};

export default ApplySectionHeader;
