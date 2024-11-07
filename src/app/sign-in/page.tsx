import Container from '../../components/atom/container.tsx';
import Seperator from '../../components/shadcn/seperator.tsx';
import AdminSignIn from './_components/admin-sign-in.tsx';
import ApplicantSignIn from './_components/applicant-sign-in.tsx';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../components/shadcn/tooltip.tsx';
import { z } from 'zod';
import { RoleSchema } from '../../lib/schemas/role-schema.ts';

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
          <p>로그인</p>
        </div>

        {loginType === 'APPLICANT' && <ApplicantSignIn />}
        {loginType === 'ADMIN' && <AdminSignIn />}

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
          {loginType === 'APPLICANT' ? '모집자' : '지원자'}로 로그인
        </button>

        <div className="flex w-full items-center justify-center gap-2 py-3 text-sm font-thin text-crews-g05">
          <Link to="/sign-up" state={{ loginType }} className="hover:underline">
            회원가입
          </Link>
          <Seperator orientation="vertical" className="h-4 bg-crews-g02" />
          <Tooltip>
            <TooltipTrigger>
              <p className="hover:underline">비밀번호 찾기</p>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="font-normal text-crews-bk01">서비스 준비중 🙇🏻</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </Container>
  );
};

export default Page;
