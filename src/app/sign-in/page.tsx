import Container from '../../components/shared/container.tsx';
import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';
import Seperator from '../../components/shared/seperator.tsx';
import LookupRecruitmentForm from './_components/lookup-recruitment-form.tsx';
import RecruitForm from './_components/recruit-form.tsx';

const Page = () => {
  return (
    <Container className="flex items-center justify-center">
      <section className="mb-10 w-full max-w-[375px]">
        <div className="mb-6 flex flex-col">
          <p className="text-lg font-semibold">누구나 쉽게 모집 · 지원</p>
          <div className="flex items-center gap-2 font-bold text-crews-b05">
            <h1 className="text-4xl">Crews</h1>
            <AnchorIcon className="h-8 w-8" />
          </div>
        </div>

        <LookupRecruitmentForm />

        <div className="my-8 flex w-full items-center gap-2">
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

        <RecruitForm />
      </section>
    </Container>
  );
};

export default Page;
