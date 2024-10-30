import { UseFormClearErrors } from 'react-hook-form';
import { IRecruitment } from '../../../../lib/types/models/i-recruitment.ts';
import { useEffect, useState } from 'react';
import { getInitialSectionSelection } from '../_utils/utils';
import { SHARED_SECTION_INDEX } from '../page';
import { IReadApplication } from '../../../../lib/types/models/i-application.ts';

interface UseSectionSelectionParams {
  recruitment: IRecruitment | undefined;
  application: IReadApplication | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clearErrors: UseFormClearErrors<any>;
}

export const useSectionSelection = ({
  recruitment,
  application,
  clearErrors,
}: UseSectionSelectionParams) => {
  // 공통 섹션
  const sharedSection = recruitment?.sections[SHARED_SECTION_INDEX];

  // 초기 focus 섹션 index
  const initalSectionSelections = getInitialSectionSelection(
    application?.sections,
    recruitment?.sections,
  );

  // 선택된 섹션 index
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(
    initalSectionSelections,
  );

  // 선택된 섹션
  const selectedSection = recruitment?.sections[selectedSectionIndex];

  const isOnlySharedSection = recruitment?.sections.length === 1;

  useEffect(() => {
    setSelectedSectionIndex(initalSectionSelections);
  }, [initalSectionSelections]);

  const handleSectionSelectionChange = (index: number) => {
    setSelectedSectionIndex(index);

    // 선택된 섹션 변경 시, 에러 메시지 초기화
    clearErrors(`sections.${selectedSectionIndex}.answers`);
  };

  return {
    sharedSection,
    selectedSectionIndex,
    selectedSection,
    isOnlySharedSection,
    handleSectionSelectionChange,
  };
};
