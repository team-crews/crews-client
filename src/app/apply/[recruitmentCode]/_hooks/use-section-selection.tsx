/*
  FixMe
  - 필요없다고 완전히 판단되면 제거
 */

// type UseSectionSelectionParams = {
//   recruitment?: z.infer<typeof RecruitmentSchema>;
//   application?: z.infer<typeof ApplicationDetailSchema>;
//
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   clearErrors: UseFormClearErrors<any>;
// };

// export const useSectionSelection = ({
//   recruitment,
//   application,
//   clearErrors,
// }: UseSectionSelectionParams) => {
//   // 공통 섹션
//   const sharedSection = recruitment?.sections[SHARED_SECTION_INDEX];
//
//   // 초기 focus 섹션 index
//   const initialSectionSelections = getInitialSectionSelection(
//     application?.sections,
//     recruitment?.sections,
//   );
//
//   // 선택된 섹션 index
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(
//     initialSectionSelections,
//   );
//
//   // 선택된 섹션
//   const selectedSection = recruitment?.sections[selectedSectionIndex];
//   const isOnlySharedSection = recruitment?.sections.length === 1;
//
//   useEffect(() => {
//     setSelectedSectionIndex(initialSectionSelections);
//   }, [initialSectionSelections]);
//
//   const handleSectionSelectionChange = (index: number) => {
//     setSelectedSectionIndex(index);
//
//     // 선택된 섹션 변경 시, 에러 메시지 초기화
//     clearErrors(`sections.${selectedSectionIndex}.answers`);
//   };
//
//   return {
//     sharedSection,
//     selectedSectionIndex,
//     selectedSection,
//     isOnlySharedSection,
//     handleSectionSelectionChange,
//   };
// };
