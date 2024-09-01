import SpinnerIcon from '../../assets/icons/spinner.svg?react';

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center bg-opacity-50">
      <SpinnerIcon className="h-10 w-10 animate-shake-infinite text-crews-b06" />
    </div>
  );
};

export default Loading;
