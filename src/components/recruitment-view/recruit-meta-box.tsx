import { IRecruitment } from '../../lib/model/i-recruitment.ts';
import { useEffect } from 'react';

const RecruitMetaBox = ({
  title,
  description,
  deadline,
}: Pick<IRecruitment, 'title' | 'description' | 'deadline'>) => {
  useEffect(() => {
    const textarea = document.querySelector('#tmp') as HTMLTextAreaElement;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl border border-crews-g01 bg-crews-w01 p-8">
      <div>
        <p className="mb-2 w-full text-xs font-bold text-crews-b06">
          공고 제목
        </p>
        <p className="w-full text-xl font-bold text-crews-bk01 placeholder:text-crews-g03">
          {title}
        </p>
      </div>

      <div>
        <p className="mb-2 w-full text-xs font-bold text-crews-b06">
          공고 내용
        </p>
        <textarea
          disabled
          id="tmp"
          className="w-full cursor-default text-sm text-crews-bk01 placeholder:text-crews-g03"
        >
          {description}
        </textarea>
      </div>

      <div>
        <p className="mb-2 w-full text-xs font-bold text-crews-b06">
          마감 일자
        </p>
        <p className="w-full text-sm text-crews-bk01 placeholder:text-crews-g03">
          {deadline}
        </p>
      </div>
    </div>
  );
};

export default RecruitMetaBox;
