import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../components/shadcn/tooltip.tsx';
import Container from '../../components/shared/container.tsx';
import Seperator from '../../components/shadcn/seperator.tsx';
import { useState } from 'react';
import ApplyForm from '../sign-in/_components/apply-form.tsx';
import RecruitForm from '../sign-in/_components/recruit-form.tsx';

type LoginType = 'RECRUITER' | 'APPLICANT';

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('APPLICANT');

  const toggleLoginType = () => {
    setLoginType((prevType) =>
      prevType === 'RECRUITER' ? 'APPLICANT' : 'RECRUITER',
    );
  };

  return (
    <Container className="flex items-center justify-center">
      <section className="w-full max-w-[650px] rounded-md border border-crews-g01 px-32 py-40 shadow-custom-light-shadow">
        <div className="mb-6 flex flex-col items-center text-3xl tracking-widest">
          <p className="font-bold">
            {loginType === 'APPLICANT' ? '지원자' : '모집자'}
          </p>
          <p>회원가입</p>
        </div>

        {loginType === 'APPLICANT' && <ApplyForm />}
        {loginType === 'RECRUITER' && <RecruitForm />}

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
          {loginType === 'APPLICANT' ? '지원자' : '모집자'}로 회원가입
        </button>

        <div className="flex w-full justify-center gap-4 py-3 text-sm font-thin text-crews-g05">
          <Link to="/sign-in" className="hover:underline">
            로그인
          </Link>
          <Tooltip>
            <TooltipTrigger>
              <button className="hover:underline">비밀번호 찾기</button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>개발중입니다 😅</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </Container>
  );
};

export default Page;
