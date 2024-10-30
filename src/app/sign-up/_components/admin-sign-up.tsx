import CommentIcon from '../../../assets/icons/comment-icon.svg?react';

const AdminSignUp = () => {
  return (
    <a
      href={import.meta.env.VITE_KAKAO_ADMIN_CHAT}
      target="_blank"
      className="flex w-full items-center justify-center gap-2 rounded bg-[#2F3234] py-2 text-sm font-bold tracking-widest text-crews-w01 hover:bg-crews-bk02"
    >
      <CommentIcon className="h-4 w-4" />
      모집자 가입 문의
    </a>
  );
};

export default AdminSignUp;
