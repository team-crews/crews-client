import { useNavigate, useRouteError } from 'react-router-dom';
import React from 'react';
import * as Sentry from '@sentry/react';
import Container from './atom/container.tsx';
import { getErrorMessage } from '../lib/utils/error.ts';
import FaceSadTearIcon from '../assets/icons/face-sad-tear-icon.svg?react';

const RootErrorBoundary = () => {
  const error = useRouteError() as Error;

  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const navigate = useNavigate();
  return (
    <>
      <Container className="bg-red flex items-center justify-center">
        <div className="max-w-screen-sm text-center text-crews-b07">
          <FaceSadTearIcon className="mx-auto h-10 w-10" />
          <p className="mt-4 text-4xl font-semibold">
            {getErrorMessage(error)}
          </p>

          <p className="mt-4 text-center text-base font-light text-crews-g05">
            이용에 불편을 드려 죄송합니다 ( ᴗ_ᴗ̩̩. ) 더 나은 서비스를 제공하기
            위해 노력하겠습니다.
            <br />
            문제가 지속해서 발생할 경우{' '}
            <a
              className="font-semibold text-crews-b05 underline hover:text-crews-b06"
              href={import.meta.env.VITE_KAKAO_OPEN_CHAT}
              target="_blank"
            >
              여기
            </a>
            를 눌러 관리자에게 문의해주세요.
          </p>

          <button
            className="mt-12 rounded-sm bg-crews-b05 px-16 py-2.5 text-sm tracking-widest text-crews-w01"
            onClick={() => navigate(-1)}
          >
            돌아가기
          </button>
        </div>
      </Container>
    </>
  );
};

export default RootErrorBoundary;
