import { z } from 'zod';
import { RecruitmentSchema } from '../../../../lib/schemas/recruitment-schema.ts';

// interface UseChoiceMapParams {
//   recruitment: z.infer<typeof RecruitmentSchema> | undefined;
// }

/*
  FixMe
  - 필요없다고 완전히 판단되면 제거 및 util 로 옮기기
 */

export type ChoiceMap = { [questionId: number]: number[] };

// export const useChoiceMap = ({ recruitment }: UseChoiceMapParams) => {
//   const [choiceMap, setChoiceMap] = useState<ChoiceMap>({});
//   const [isChoiceMapReady, setIsChoiceMapReady] = useState(false);
//
//   useEffect(() => {
//     if (recruitment?.sections) {
//       const map: ChoiceMap = {};
//
//       recruitment.sections.forEach((section) => {
//         section.questions.forEach((question) => {
//           if (question.type === 'SELECTIVE' && question.choices.length > 0) {
//             map[question.id] = question.choices.map((choice) => choice.id);
//           }
//         });
//       });
//
//       setChoiceMap(map);
//       setIsChoiceMapReady(Object.keys(map).length > 0);
//     }
//   }, [recruitment]);
//
//   return {
//     choiceMap,
//     isChoiceMapReady,
//   };
// };

export const generateChoiceMap = (
  recruitment: z.infer<typeof RecruitmentSchema>,
) => {
  const choiceMap: ChoiceMap = recruitment.sections.reduce((acc, section) => {
    section.questions.forEach((question) => {
      if (question.type === 'SELECTIVE' && question.choices.length > 0) {
        acc[question.id] = question.choices.map((choice) => choice.id);
      }
    });
    return acc;
  }, {} as ChoiceMap);
  return choiceMap;
};
