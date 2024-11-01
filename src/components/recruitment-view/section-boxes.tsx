import QuestionBoxes from './question-boxes.tsx';
import useAutosizeTextArea from '../../hooks/use-autosize-textarea.ts';
import { z } from 'zod';
import { SectionSchema } from '../../lib/types/schemas/section-schema.ts';
import {
  AnswersBySectionSchema,
  AnswerSchema,
} from '../../lib/types/schemas/application-schema.ts';
import { findSelectedSection } from '../../lib/utils/utils.ts';

const SectionBox = ({
  section,
  answers,
}: {
  section: z.infer<typeof SectionSchema>;
  answers?: z.infer<typeof AnswerSchema>[];
}) => {
  useAutosizeTextArea('KARINA_IS_GOD', section.description);

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="flex h-fit w-full flex-col gap-1 bg-crews-b04 p-4">
        <p className="w-full bg-inherit text-base font-bold text-crews-w01">
          {section.name}
        </p>
        <textarea
          readOnly
          name="KARINA_IS_GOD"
          rows={1}
          className="cursor-default bg-inherit text-xs text-crews-w01"
          value={section.description}
        />
      </div>

      <div className="flex h-fit w-full flex-col gap-4 bg-crews-b01 p-4">
        <QuestionBoxes questions={section.questions} answers={answers} />
      </div>
    </div>
  );
};

const SectionBoxes = ({
  sections,
  answersBySection,
}: {
  sections: z.infer<typeof SectionSchema>[];
  answersBySection?: z.infer<typeof AnswersBySectionSchema>[];
}) => {
  /*
    ReadMe
    - This component is a view only section box component
    - It may have answers or may only render the recruitment
   */

  const selectedSectionIds = answersBySection
    ? findSelectedSection(answersBySection)
    : null;

  const answersMap = answersBySection?.reduce(
    (map, ansBySec) => {
      map[ansBySec.sectionId] = ansBySec.answers;
      return map;
    },
    {} as Record<
      z.infer<typeof AnswersBySectionSchema>['sectionId'],
      z.infer<typeof AnswersBySectionSchema>['answers']
    >,
  );

  return (
    <section className="flex h-fit w-full flex-col gap-8">
      {sections.map((section) => {
        if (!selectedSectionIds || selectedSectionIds.includes(section.id)) {
          return (
            <SectionBox
              key={section.id}
              section={section}
              answers={answersMap?.[section.id]}
            />
          );
        }
        return null;
      })}
    </section>
  );
};

export default SectionBoxes;
