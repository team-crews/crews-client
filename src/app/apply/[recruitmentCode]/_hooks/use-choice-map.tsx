import { IRecruitment } from '../../../../lib/types/models/i-recruitment.ts';
import { useEffect, useState } from 'react';

interface UseChoiceMapParams {
  recruitment: IRecruitment | undefined;
}

export type ChoiceMap = { [questionId: number]: number[] };

export const useChoiceMap = ({ recruitment }: UseChoiceMapParams) => {
  const [choiceMap, setChoiceMap] = useState<ChoiceMap>({});

  useEffect(() => {
    if (recruitment?.sections) {
      const map: ChoiceMap = {};

      recruitment.sections.forEach((section) => {
        section.questions.forEach((question) => {
          if (question.type === 'SELECTIVE' && question.choices.length > 0) {
            map[question.id] = question.choices.map((choice) => choice.id);
          }
        });
      });

      setChoiceMap(map);
    }
  }, [recruitment]);

  return {
    choiceMap,
  };
};
