import { IRole } from '../../lib/model/i-role.ts';
import { Outlet } from 'react-router-dom';
import useSession from '../../hooks/use-session.ts';

const RequireAuth = ({ availableRoles }: { availableRoles: IRole[] }) => {
  const { accessToken, role } = useSession();
  const isAvailable = availableRoles.includes(role);

  /*
      ToDo
      - 두 경우에 대한 redirection 혹은 에러 페이지 필요
     */
  if (!accessToken) return <div>로그인 필요</div>;
  if (!isAvailable) return <div>접근 불가</div>;

  return (
    <>
      {/*
        ToDo
        - <AuthHeader> 필요
         */}
      <Outlet />
    </>
  );
};

export default RequireAuth;
