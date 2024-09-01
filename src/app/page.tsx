import Container from '../components/shared/container.tsx';
import AnchorIcon from '../assets/icons/anchor-icon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/sign-in');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="flex items-center justify-center">
      <div className="animate-fadeIn mb-6 flex flex-col">
        <p className="text-xl font-semibold">누구나 쉽게 모집 · 지원</p>
        <div className="flex items-center gap-2 font-bold text-crews-b05">
          <h1 className="text-6xl">Crews</h1>
          <AnchorIcon className="h-12 w-12" />
        </div>
      </div>
    </Container>
  );
};

export default Page;
