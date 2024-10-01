const url = import.meta.env.VITE_KAKAO_OPEN_CHAT;
import ChatIcon from '../../assets/icons/comment-icon.svg?react';

const HelpButton = () => {
  return (
    <a
      href={url}
      className="fixed bottom-4 left-4 z-50 cursor-pointer"
      target="_blank"
    >
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-crews-b04 text-crews-w01 hover:opacity-80">
        <ChatIcon className="h-6 w-6" />
      </div>
    </a>
  );
};

export default HelpButton;
