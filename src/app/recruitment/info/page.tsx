import { useSearchParams } from 'react-router-dom';

const Page = () => {
  const [searchParams] = useSearchParams();

  const title = searchParams.get('title');

  return (
    <>
      <div>모집 조회 </div>
      <div>{title}</div>
    </>
  );
};

export default Page;
