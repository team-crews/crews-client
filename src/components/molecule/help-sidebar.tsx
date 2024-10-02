import ChatIcon from '../../assets/icons/comment-icon.svg?react';
import QuestionIcon from '../../assets/icons/question-icon.svg?react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../shadcn/tooltip.tsx';

const HelpSidebar = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <a href={import.meta.env.VITE_GUIDE_BOOK} target="_blank">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-crews-b04 text-crews-w01 hover:opacity-80">
              <QuestionIcon className="h-4 w-4" />
            </div>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-crews-w01">
          <p>가이드북</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <a href={import.meta.env.VITE_KAKAO_OPEN_CHAT} target="_blank">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#FAE100] text-crews-w01 hover:opacity-80">
              <ChatIcon className="h-4 w-4 text-crews-bk01" />
            </div>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-crews-w01">
          <p>카카오 문의</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default HelpSidebar;
