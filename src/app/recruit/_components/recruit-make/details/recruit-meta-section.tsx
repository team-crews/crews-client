import { useFormContext } from 'react-hook-form';
import {
  isFilledInput,
  isProperTime,
} from '../../../../../lib/utils/validation.ts';
import useAutosizeTextarea from '../../../../../hooks/use-autosize-textarea.ts';
import { z } from 'zod';
import { CreatedRecruitmentSchema } from '../../../../../lib/types/schemas/recruitment-schema.ts';
import React from 'react';
import Container from '../../../../../components/shared/container.tsx';
import dayjs from 'dayjs';
import { convertDateAndTimeToDeadline } from '../../../../../lib/utils/convert.ts';

const times = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, '0')}:00`,
);

const RecruitMetaSection = () => {
  const { register, watch, getValues } =
    useFormContext<z.infer<typeof CreatedRecruitmentSchema>>();
  const value = watch('description');
  useAutosizeTextarea('description', value);

  return (
    <Container className="flex flex-col gap-6 rounded-xl border border-crews-g01 bg-crews-w01 p-8">
      <div>
        <Label>공고 제목</Label>
        <input
          maxLength={30}
          autoComplete="off"
          className="w-full text-xl font-bold text-crews-bk01 placeholder:text-crews-g03"
          placeholder="공고 제목을 입력해주세요."
          {...register('title', {
            validate: {
              validateIfFilled: (v) =>
                isFilledInput(v, '공고 제목이 작성되지 않았어요.'),
            },
          })}
        />
      </div>

      <div>
        <Label>공고 내용</Label>
        <textarea
          maxLength={1500}
          rows={1}
          id="recruitment-description"
          spellCheck={false}
          className="w-full text-sm text-crews-bk01 placeholder:text-crews-g03"
          placeholder="공고 세부사항을 입력해주세요."
          {...register('description', {
            validate: {
              validateIfFilled: (v) =>
                isFilledInput(v, '공고 세부사항이 작성되지 않았어요.'),
            },
          })}
        />
      </div>

      <div className="flex">
        <div className="flex-1">
          <Label>마감 일자</Label>
          <input
            {...register('deadlineDate', {
              validate: {
                validateIfFilled: (v) =>
                  isFilledInput(v, '마감 일자가 선택되지 않았어요.'),
              },
            })}
            className="text-sm text-crews-bk01 placeholder:text-crews-g03"
            type="date"
          />
        </div>

        <div className="flex-1">
          <Label>마감 시간</Label>
          <select
            className="-ml-1 text-sm"
            {...register('deadlineTime', {
              validate: {
                validateIfFilled: (v) =>
                  isFilledInput(v, '마감 시간이 선택되지 않았어요.'),
                validateIfProperTime: (v) => {
                  /*
                    FixMe
                    - 만약 `deadlineDate`이 입력이 안되어있으면 `convertDateAndTimeToDeadline`에서 error 가 발생됨
                       -> 이러면 근데 그 validate들이 react-hook-form에서 그냥 안잡혀버리나봐
                    - 좀 잘짜보고 싶은데 좋은방법 생각 안나서 우선 return 해버림
                   */
                  if (!getValues('deadlineDate')) return '';

                  return isProperTime(
                    dayjs().toISOString(),
                    convertDateAndTimeToDeadline({
                      deadlineDate: getValues('deadlineDate'),
                      deadlineTime: v,
                    }),
                    '마감 기간은 현재 시간 이후로 지정해주세요.',
                  );
                },
              },
            })}
            defaultValue=""
          >
            <option value="" disabled hidden>
              마감 시간을 선택해주세요.
            </option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Container>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="mb-2 w-full text-xs font-bold text-crews-b06">{children}</p>
  );
};

export default RecruitMetaSection;
