import { createContext } from 'react';

export interface RecruitFormContextType {
  test: string;
}

export const RecruitFormContext = createContext<
  RecruitFormContextType | undefined
>(undefined);

export const RecruitmentFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const test = 'test';
  // TODO: useQuery로 GET /recruitments/ready 요청
  //TODO: mutate로 post 요청

  return (
    <RecruitFormContext.Provider value={{ test }}>
      {children}
    </RecruitFormContext.Provider>
  );
};
