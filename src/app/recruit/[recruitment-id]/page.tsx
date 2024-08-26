import { useState } from 'react';

import Container from '../../../components/shared/container';
import RecruitWaitPage from './_components/recruit-wait/recruit-wait-page';
import RecruitMakePage from './_components/recruit-make/recruit-make-page';
import { RecruitFormProvider } from '../../../contexts/recruit-form-context';

type Status = 'make' | 'wait' | 'eval';

const Page = () => {
  /**TODO: 모집 코드 input get 요청 후 status 처리 (커스텀 훅 api 작성)
   * 1. make
   * 2. wait
   * 3. eval
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, _setStatus] = useState<Status>('make');

  const renderPage = () => {
    switch (status) {
      case 'make':
        return (
          <RecruitFormProvider>
            <RecruitMakePage />
          </RecruitFormProvider>
        );
      case 'wait':
        return <RecruitWaitPage />;
      case 'eval':
        // return <ApplicationEvalPage/>;
        return <></>;
      default:
        //TODO: apply shared error page
        return <div>error 페이지</div>;
    }
  };

  return <Container className="flex justify-center">{renderPage()}</Container>;
};

export default Page;
