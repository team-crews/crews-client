const url = import.meta.env.VITE_KAKAO_OPEN_CHAT;

const HelpButton = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-crews-r01">
      <a href={url} className="text-base font-bold" target="_blank">
        🚨
      </a>
    </div>
  );
};

export default HelpButton;
