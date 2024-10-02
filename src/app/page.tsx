import LandingRecruit from '../assets/images/landing-recruit.png';
import LandingApply from '../assets/images/landing-apply.png';
import Container from '../components/shared/container.tsx';
import { Link } from 'react-router-dom';

const Page = () => {
  return (
    <Container className="flex overflow-hidden">
      <div className="flex flex-1 justify-center">
        <div className="mt-32 flex flex-col items-center">
          <div className="flex w-[350px] flex-col text-center">
            <div className="flex flex-col gap-2 text-5xl font-bold tracking-wide text-crews-b05">
              <p>크루즈에서,</p>
              <p>누구나 쉽게 지원</p>
            </div>
            <p className="mt-4 text-base tracking-wide text-crews-g06">
              모집코드를 통해 지원할 공고를 확인하고
              <br /> 지원 후 메일로 합격 여부를 확인해 보세요
            </p>
            <input
              placeholder="모집 코드"
              className="mb-20 mt-12 rounded py-2 indent-2 outline outline-crews-g02 placeholder:text-crews-g02 hover:outline-crews-g04"
            />
          </div>
          <img alt="지원서 예시" width={550} src={LandingApply} />
        </div>
      </div>
      <div className="flex flex-1 justify-center bg-crews-b01">
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
              className="mb-20 mt-12 rounded-full bg-[#2F3234] py-2 font-bold tracking-widest text-crews-w01 hover:bg-[#000]"
            >
              바로 모집 시작하기
            </Link>
          </div>
          <img
            alt="모집 예시"
            width={550}
            src={LandingRecruit}
            className="shadow-custom-shadow"
          />
        </div>
      </div>
    </Container>
  );
};

export default Page;
