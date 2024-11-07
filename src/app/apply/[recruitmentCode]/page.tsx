import Container from '../../../components/atom/container.tsx';
import ApplySectionBox from './_components/apply-section-box';
import ApplyNarrativeBox from './_components/apply-narrative-box';
import ApplySelectiveBox from './_components/apply-selective-box';
import { QuestionType } from '../../../lib/enums';
import HeaderSection from './_components/header-section';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ApplySectionHeader from './_components/apply-section-header';
import {
  convertToFormApplication,
  getInitialSectionSelection,
} from './_utils/utils';
import { z } from 'zod';
import { QuestionSchema } from '../../../lib/schemas/question-schema.ts';
import {
  CREATED_NARRATIVE_ANSWER,
  CREATED_SELECTIVE_ANSWER,
} from '../../../lib/schemas/default-data.ts';
import { ReadApplicationResponseSchema } from '../../../apis/response-body-schema.ts';
import FooterSection from './_components/footer-section.tsx';
import { generateChoiceMap } from './_hooks/use-choice-map.tsx';
import { RecruitmentSchema } from '../../../lib/schemas/recruitment-schema.ts';

export type IFormApplication = {
  /*
    ReadMe
    - 기본적으로 ApplicationDetailSchema 와 동일
    - choiceIds field 에 선택되지 않은 선택지에 대하여 false 를 채우기 위해 boolean type 포함
   */
  sections: {
    sectionId: number;
    answers: {
      questionId: number;
      content: string | null;
      choiceIds: (number | boolean)[] | null;
      type: 'NARRATIVE' | 'SELECTIVE';
    }[];
  }[];
};

const defaultApplication: IFormApplication = {
  sections: [],
};

export const SHARED_SECTION_INDEX = 0;

const Page = ({
  recruitment,
  application,
}: {
  recruitment: z.infer<typeof RecruitmentSchema>;
  application: z.infer<typeof ReadApplicationResponseSchema>;
}) => {
  const methods = useForm<IFormApplication>({
    defaultValues: defaultApplication,
  });

  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number>(1);
  const handleSectionSelectionChange = (idx: number) => {
    methods.clearErrors(`sections.${selectedSectionIdx}.answers`);
    setSelectedSectionIdx(idx);
  };

  useEffect(() => {
    if (application) {
      // 저장된 지원서 존재
      const formApplication: IFormApplication = convertToFormApplication(
        application,
        generateChoiceMap(recruitment),
      );

      setSelectedSectionIdx(
        getInitialSectionSelection(application.sections, recruitment.sections),
      );

      methods.reset(formApplication);
    } else {
      // 저장된 지원서 부재
      const initialSections = recruitment?.sections.map((section) => ({
        sectionId: section.id,
        answers: section.questions.map((question) => {
          return question.type === 'NARRATIVE'
            ? CREATED_NARRATIVE_ANSWER(question.id)
            : CREATED_SELECTIVE_ANSWER(question.id);
        }),
      }));

      methods.reset({
        sections: initialSections || [],
      });
    }
  }, [application, methods, recruitment]);

  return (
    <Container className="flex h-auto flex-col gap-8 py-8">
      <HeaderSection />
      <FormProvider {...methods}>
        <form>
          <div className="flex flex-col gap-8">
            <ApplySectionBox
              key={recruitment.sections[SHARED_SECTION_INDEX].id}
              name={recruitment.sections[SHARED_SECTION_INDEX].name}
              description={
                recruitment.sections[SHARED_SECTION_INDEX].description
              }
            >
              <div className="flex flex-col gap-8">
                {recruitment.sections[SHARED_SECTION_INDEX].questions.map(
                  (question, index) => (
                    <RenderQuestion
                      key={question.id}
                      question={question}
                      questionIndex={index}
                      sectionIndex={SHARED_SECTION_INDEX}
                    />
                  ),
                )}
              </div>
            </ApplySectionBox>
            {recruitment.sections[selectedSectionIdx] && (
              <>
                <p className="mt-4 text-base font-semibold text-crews-bk01">
                  제출 시 선택된 섹션의 내용만이 저장됩니다.
                </p>
                <div className="flex w-full flex-col">
                  <ApplySectionHeader
                    sections={recruitment.sections}
                    selectionIndex={selectedSectionIdx}
                    handleSelectionChange={handleSectionSelectionChange}
                  />

                  <ApplySectionBox
                    key={recruitment.sections[selectedSectionIdx].id}
                    name={recruitment.sections[selectedSectionIdx].name}
                    description={
                      recruitment.sections[selectedSectionIdx].description
                    }
                    isSelectable={true}
                  >
                    <div className="flex flex-col gap-8">
                      {recruitment.sections[selectedSectionIdx].questions.map(
                        (question, index) => (
                          <RenderQuestion
                            key={question.id}
                            question={question}
                            questionIndex={index}
                            sectionIndex={selectedSectionIdx}
                          />
                        ),
                      )}
                    </div>
                  </ApplySectionBox>
                </div>
              </>
            )}
          </div>
        </form>
        <FooterSection
          application={application}
          recruitment={recruitment}
          selectedSectionIdx={selectedSectionIdx}
          isOnlySharedSection={recruitment.sections.length === 1}
          deadline={recruitment.deadline}
        />
      </FormProvider>
    </Container>
  );
};

const RenderQuestion = ({
  question,
  questionIndex,
  sectionIndex,
}: {
  question: z.infer<typeof QuestionSchema>;
  questionIndex: number;
  sectionIndex: number;
}) => {
  switch (question.type) {
    case QuestionType.NARRATIVE:
      return (
        <ApplyNarrativeBox
          key={question.id}
          question={question}
          questionIndex={questionIndex}
          sectionIndex={sectionIndex}
        />
      );
    case QuestionType.SELECTIVE:
      return (
        <ApplySelectiveBox
          key={question.id}
          question={question}
          questionIndex={questionIndex}
          sectionIndex={sectionIndex}
        />
      );
    default:
      return null;
  }
};

export default Page;
