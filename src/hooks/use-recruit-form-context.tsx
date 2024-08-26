import { useContext } from 'react';
import {
  RecruitFormContext,
  RecruitFormContextType,
} from '../contexts/recruit-form-context';

const useRecruitFormContext = (): RecruitFormContextType => {
  const context = useContext(RecruitFormContext);

  if (!context) {
    throw new Error(
      'useRecruitmentForm must be used within a RecruitmentFormProvider',
    );
  }

  return context;
};

export default useRecruitFormContext;
