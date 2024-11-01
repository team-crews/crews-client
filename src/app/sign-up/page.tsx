import { Link, useLocation } from 'react-router-dom';
import Container from '../../components/shared/container.tsx';
import Seperator from '../../components/shadcn/seperator.tsx';
import { useState } from 'react';
import ApplicantSignUp from './_components/applicant-sign-up.tsx';
import AdminSignUp from './_components/admin-sign-up.tsx';
import { z } from 'zod';
import { RoleSchema } from '../../lib/types/schemas/role-schema.ts';

const Page = () => {
  const location = useLocation();
  const [loginType, setLoginType] = useState<z.infer<typeof RoleSchema>>(
    location.state?.loginType ?? 'APPLICANT',
  );

  const toggleLoginType = () => {
    setLoginType((prevType) => (prevType === 'ADMIN' ? 'APPLICANT' : 'ADMIN'));
  };

  return (
    <Container className="flex items-center justify-center">
      <section className="w-full max-w-[650px] rounded-md border border-crews-g01 px-32 py-40 shadow-custom-light-shadow">
        <div className="mb-6 flex flex-col items-center text-3xl tracking-widest">
          <p className="font-bold">
            {loginType === 'APPLICANT' ? '지원자' : '모집자'}
          </p>
          <p>회원가입</p>
          {loginType === 'APPLICANT' && (
            <p className="mt-4 rounded-full bg-crews-g01 px-4 py-1 text-xs tracking-normal text-crews-bk01">
              이메일은 모집 결과 발송에 활용됩니다.
            </p>
          )}
        </div>

        {loginType === 'APPLICANT' && <ApplicantSignUp />}
        {loginType === 'ADMIN' && <AdminSignUp />}

        <div className="my-6 flex w-full items-center gap-2">
          <Seperator
            orientation="horizontal"
            className="flex-grow bg-crews-g02"
          />
          <p className="text-xs text-crews-g02">or</p>
          <Seperator
            orientation="horizontal"
            className="flex-grow bg-crews-g02"
          />
        </div>

        <button
          onClick={toggleLoginType}
          className="w-full rounded py-2 text-sm font-normal tracking-wide text-crews-bk01 outline outline-1 outline-crews-g03 hover:bg-crews-g01"
        >
          {loginType === 'APPLICANT' ? '모집자' : '지원자'}로 회원가입
        </button>

        <div className="flex w-full justify-center gap-4 py-3 text-sm font-thin text-crews-g05">
          <Link to="/sign-in" state={{ loginType }} className="hover:underline">
            로그인
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default Page;
