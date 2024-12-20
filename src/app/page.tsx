import LandingRecruit from '../assets/images/landing-recruit.png';
import LandingApply from '../assets/images/landing-apply.png';
import Container from '../components/atom/container.tsx';
import { Link } from 'react-router-dom';
import LookupRecruitmentForm from './lookup-recruitment-form.tsx';
import { cn } from '../lib/utils/utils.ts';
import useBreakpoints from '../hooks/use-breakpoints.ts';

const Page = () => {
  const { isSmaller } = useBreakpoints({ breakpoint: 'md' });

  return (
    <Container
      className={cn('flex h-dvh', {
        'overflow-hidden': !isSmaller,
        'flex-col': isSmaller,
      })}
    >
      <section className="flex flex-1 justify-center">
        <div className="mt-32 flex flex-col items-center">
          <div className="flex w-[350px] flex-col text-center">
            <div className="flex flex-col gap-2 text-5xl font-bold tracking-wide text-crews-b05">
              <p>크루즈에서,</p>
              <p>누구나 쉽게 지원</p>
            </div>

            <p className="mt-4 text-base tracking-wide text-crews-g06">
              지원할 동아리를 검색하고
              <br /> 지원 후 메일로 합격 여부를 확인해 보세요
            </p>

            <div className="my-12">
              <LookupRecruitmentForm />
            </div>
          </div>
          <div
            className={cn('px-4', {
              'pb-4': isSmaller,
            })}
          >
            <img alt="지원서 예시" width={640} src={LandingApply} />
          </div>
        </div>
      </section>

      <section className="flex flex-1 justify-center bg-crews-b01">
        <div className="mt-32 flex flex-col items-center">
          <div className="flex w-[350px] flex-col text-center">
            <div className="flex flex-col gap-2 text-5xl font-bold tracking-wide text-[#2F3234]">
              <p>크루즈에서,</p>
              <p>누구나 쉽게 모집</p>
            </div>

            <p className="mt-4 text-base tracking-wide text-[#2F3234]">
              모집 공고 생성부터 합격 알림 발송까지
              <br />
              크루즈에서 쉽고 빠르게 진행해보세요
            </p>

            <Link
              to="/recruit"
              className="my-12 rounded-full bg-[#2F3234] py-2 font-bold tracking-widest text-crews-w01 hover:bg-[#000]"
            >
              바로 모집 시작하기
            </Link>
          </div>
          <div
            className={cn('px-4', {
              'pb-4': isSmaller,
            })}
          >
            <img
              alt="모집 예시"
              width={640}
              src={LandingRecruit}
              className="shadow-custom-shadow"
            />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Page;
