import { useState } from 'react';
import ApplicationWaitPage from '../../../components/application/application-wait/ApplicationWaitPage';
import Container from '../../../components/shared/container';

const Page = () => {
  /**TODO: 모집 코드 input get 요청 후 status 처리 (커스텀 훅 api 작성)
   * 1. make
   * 2. wait
   * 3. eval
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState('wait');

  const renderPage = () => {
    switch (status) {
      case 'make':
        // return <ApplicationMakePage/>;
        return <></>;
      case 'wait':
        return <ApplicationWaitPage />;
      case 'eval':
        // return <ApplicationEvalPage/>;
        return <></>;
      default:
        //TODO: apply shared error page
        return <div>error 페이지</div>;
    }
  };

  return <Container>{renderPage()}</Container>;
};

export default Page;
