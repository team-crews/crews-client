import { createContext } from 'react';
import { GetRecruitmentsReadyResponse } from '../lib/types';
import { formMockData } from '../lib/mock';

export interface RecruitFormContextType {
  recruitment: GetRecruitmentsReadyResponse;
  sections: GetRecruitmentsReadyResponse['sections'];
}

export const RecruitFormContext = createContext<
  RecruitFormContextType | undefined
>(undefined);

export const RecruitFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TODO: useQuery로 GET /recruitments/ready 요청
  //TODO: mutate로 post 요청

  return (
    <RecruitFormContext.Provider
      value={{ recruitment: formMockData, sections: formMockData.sections }}
    >
      {children}
    </RecruitFormContext.Provider>
  );
};
