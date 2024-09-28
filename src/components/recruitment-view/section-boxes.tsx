import { ISection } from '../../lib/types/models/i-section.ts';
import { IAnswer } from '../../lib/types/models/i-application.ts';
import QuestionBoxes from './question-boxes.tsx';
import { useEffect } from 'react';

const SectionBox = ({
  name,
  description,
  questions,
  answers,
}: { answers?: IAnswer[] } & Pick<
  ISection,
  'name' | 'description' | 'questions'
>) => {
  useEffect(() => {
    const textarea = document.querySelector(
      '#description-textarea',
    ) as HTMLTextAreaElement;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="flex h-fit w-full flex-col gap-1 bg-crews-b04 p-4">
        <p className="w-full bg-inherit text-base font-bold text-crews-w01">
          {name}
        </p>
        <textarea
          readOnly
          id="description-textarea"
          rows={1}
          className="cursor-default bg-inherit text-xs text-crews-w01"
          value={description}
        />
      </div>

      <div className="flex h-fit w-full flex-col gap-4 bg-crews-b01 p-4">
        <QuestionBoxes questions={questions} answers={answers} />
      </div>
    </div>
  );
};

function findSelectedSection(
  sections: ISection[],
  answers: IAnswer[],
): number[] {
  const answerMap = new Map(
    answers.map((answer) => [answer.questionId, answer]),
  );

  return sections.reduce((answeredSections: number[], section) => {
    const hasAnsweredQuestion = section.questions.some((question) => {
      const answer = answerMap.get(question.id);
      // @ts-expect-error Fix Me later answer type or question type?
      return answer && answer.type === question.type;
    });

    if (hasAnsweredQuestion) {
      answeredSections.push(section.id);
    }

    return answeredSections;
  }, []);
}

const SectionBoxes = ({
  sections,
  answers,
}: {
  sections: ISection[];
  answers?: IAnswer[];
}) => {
  const selectedSectionIds = answers
    ? findSelectedSection(sections, answers)
    : false;

  return (
    <section className="flex h-fit w-full flex-col gap-8">
      {sections.map((section) =>
        !selectedSectionIds || selectedSectionIds.includes(section.id) ? (
          <SectionBox
            key={section.id}
            name={section.name}
            answers={answers}
            description={section.description}
            questions={section.questions}
          />
        ) : null,
      )}
    </section>
  );
};

export default SectionBoxes;
