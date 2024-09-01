import { useEffect, useState } from 'react';
import { formatNumberTime } from '../../../../lib/utils/time.ts';
import dayjs from 'dayjs';

const DeadlineSection = ({
  recruiting,
  stopRecruiting,
  deadline,
}: {
  recruiting: boolean;
  stopRecruiting: () => void;
  deadline: Date;
}) => {
  const [diff, setDiff] = useState<number>(dayjs(deadline).diff(dayjs()));
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (!recruiting) return;

    const interval = setInterval(() => {
      const diff = dayjs(deadline).diff(dayjs());
      if (diff <= 0) {
        stopRecruiting();
        setDiff(0);
      } else {
        setDiff(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [recruiting, deadline, stopRecruiting]);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-crews-b01 py-6">
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
        {recruiting ? (
          <>
            <p className="text-2xl font-semibold text-crews-bk01">{`D-${day}`}</p>
            <p className="text-3xl font-bold text-crews-b05">
              {formatNumberTime(diff)}
            </p>
          </>
        ) : (
          <p className="text-2xl font-semibold text-crews-bk01">
            모집이 <span className="text-crews-b05">마감</span>되었습니다 ⏰
          </p>
        )}
      </div>
      <p className="text-crews-g04">
        {`마감일자 : ${dayjs(deadline).format('YYYY-MM-DD HH:mm:ss')}`}
      </p>
    </section>
  );
};

export default DeadlineSection;
