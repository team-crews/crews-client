import { useParams } from 'react-router-dom';

const Page = () => {
  const { recruitmentTitle } = useParams<{ recruitmentTitle: string }>();

  return (
    <>
      <div>모집 조회 </div>
      <div>{recruitmentTitle}</div>
    </>
  );
};

export default Page;
