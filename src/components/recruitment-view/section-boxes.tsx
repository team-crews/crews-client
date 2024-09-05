import { ISection } from '../../lib/model/i-section.ts';
import { IAnswer } from '../../lib/model/i-application.ts';
import QuestionBoxes from './question-boxes.tsx';

const SectionBox = ({
  name,
  description,
  questions,
  answers,
}: { answers?: IAnswer[] } & Pick<
  ISection,
  'name' | 'description' | 'questions'
>) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="flex w-full flex-col gap-1 bg-crews-b04 p-4">
        <p className="w-full bg-inherit text-base font-bold text-crews-w01">
          {name}
        </p>
        <p className="bg-inherit text-xs text-crews-w01">{description}</p>
      </div>

      <div className="flex w-full flex-col gap-4 bg-crews-b01 p-4">
        <QuestionBoxes questions={questions} answers={answers} />
      </div>
    </div>
  );
};

const SectionBoxes = ({
  sections,
  answers,
}: {
  sections: ISection[];
  answers?: IAnswer[];
}) => {
  return (
    <section className="flex h-fit w-full flex-col gap-8 overflow-scroll">
      {sections.map((section) => (
        <SectionBox
          key={section.id}
          name={section.name}
          answers={answers}
          description={section.description}
          questions={section.questions}
        />
      ))}
    </section>
  );
};

export default SectionBoxes;
