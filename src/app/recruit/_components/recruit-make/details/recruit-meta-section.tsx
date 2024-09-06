import { useFormContext } from 'react-hook-form';
import { ICreatedRecruitment } from '../../../../../lib/model/i-recruitment.ts';
import { useEffect } from 'react';
import {
  isFilledInput,
  isProperDeadlinePattern,
} from '../../../../../lib/utils/validation.ts';

const RecruitMetaSection = () => {
  const { register, watch } = useFormContext<ICreatedRecruitment>();
  const value = watch('description');

  useEffect(() => {
    const textarea = document.querySelector(
      '#recruitment-description',
    ) as HTMLTextAreaElement;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-crews-g01 bg-crews-w01 p-8">
      <div>
        <p className="mb-2 w-full text-xs font-bold text-crews-b06">
          공고 제목
        </p>
        <input
          maxLength={30}
          autoComplete="off"
          className="w-full text-xl font-bold text-crews-bk01 placeholder:text-crews-g03"
          placeholder="공고 제목을 입력해주세요."
          {...register('title', {
            validate: {
              isFilledInput: (v) =>
                isFilledInput(v, '공고 제목이 작성되지 않았어요.'),
            },
          })}
        />
      </div>

      <div>
        <p className="mb-2 w-full text-xs font-bold text-crews-b06">
          공고 내용
        </p>
        <textarea
          maxLength={1500}
          rows={1}
          id="recruitment-description"
          spellCheck={false}
          className="w-full text-sm text-crews-bk01 placeholder:text-crews-g03"
          placeholder="공고 세부사항을 입력해주세요."
          {...register('description', {
            validate: {
              isFilledInput: (v) =>
                isFilledInput(v, '공고 세부사항이 작성되지 않았어요.'),
            },
          })}
        />
      </div>

      <div>
        <p className="mb-2 w-full text-xs font-bold text-crews-b06">
          마감 일자
        </p>
        <input
          maxLength={11}
          autoComplete="off"
          placeholder="모집 마감은 한시간 단위로 가능합니다. (ex. 24년 11월 6일 저녁 6시 : 24-11-06-18)"
          className="w-full text-sm text-crews-bk01 placeholder:text-crews-g03"
          {...register('deadline', {
            validate: {
              isFilledInput: (v) =>
                isFilledInput(v, '마감 시간이 작성되지 않았어요.'),
              isProperDeadlinePattern,
            },
          })}
        />
      </div>
    </div>
  );
};

export default RecruitMetaSection;
