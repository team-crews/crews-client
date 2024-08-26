import { createContext } from 'react';
import { GetRecruitmentsReadyResponse } from '../lib/types';
import { formMockData } from '../lib/mock';

export interface RecruitFormContextType {
  recruitment: GetRecruitmentsReadyResponse;
  sections: GetRecruitmentsReadyResponse['sections'];
  handleSubmit: () => void;
  handleSaveTemporary: () => void;
}

export const RecruitFormContext = createContext<
  RecruitFormContextType | undefined
>(undefined);

export const RecruitFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TODO: useQuery로 GET /recruitments/ready 요청 (현재는 mockData 사용)

  const handleSubmit = () => {
    //TODO: post 요청 (제출)
    return;
  };

  const handleSaveTemporary = () => {
    //TODO: post 요청 (임시저장)
    return;
  };

  return (
    <RecruitFormContext.Provider
      value={{
        recruitment: formMockData,
        sections: formMockData.sections,
        handleSubmit,
        handleSaveTemporary,
      }}
    >
      {children}
    </RecruitFormContext.Provider>
  );
};
