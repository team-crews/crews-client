import SpinnerIcon from '../../assets/icons/spinner-icon.svg?react';

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-crews-g01 bg-opacity-30">
      <SpinnerIcon className="h-10 w-10 animate-shake-infinite bg-transparent text-crews-b06" />
    </div>
  );
};

export default Loading;
