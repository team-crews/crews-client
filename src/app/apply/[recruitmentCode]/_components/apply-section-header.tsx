import { ISection } from '../../../../lib/types/models/i-section.ts';
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
    <div className="justify start flex w-full flex-row gap-1">
      {sections.map((section, index) => {
        if (index === SHARED_SECTION_INDEX) return null;

        return (
          <div
            key={section.id}
            className={cn(
              'cursor-pointer rounded-t-xl px-3 pb-2 pt-3 text-sm font-semibold text-crews-w01',
              {
                'w-fit min-w-8 bg-crews-b04': selectionIndex === index,
                'max-w-16 truncate bg-crews-b03': selectionIndex !== index,
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
