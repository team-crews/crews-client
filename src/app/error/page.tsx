import Container from '../../components/shared/container.tsx';
import FaceSadTearIcon from '../../assets/icons/face-sad-tear-icon.svg?react';
import { Button } from '../../components/shadcn/button.tsx';
import { useNavigate } from 'react-router-dom';

const url = import.meta.env.VITE_KAKAO_OPEN_CHAT;

const Page = () => {
  const navigate = useNavigate();
  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-crews-b07">
        <FaceSadTearIcon className="h-10 w-10" />
        <div className="text-center">
          <p className="text-sm font-semibold text-crews-b07">
            예상치 못한 오류가 발생했습니다.
          </p>
          <p className="mb-4 text-sm font-semibold text-crews-b07">
            <a
              href={url}
              className="text-base font-light text-crews-b04"
              target="_blank"
            >
              {'🤣 카카오톡 오픈채팅 '}
            </a>
            에 문의해주세요.
          </p>
          <Button onClick={() => navigate(-1)} size="sm">
            돌아가기
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Page;
