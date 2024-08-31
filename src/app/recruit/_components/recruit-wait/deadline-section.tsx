import { useEffect, useState } from 'react';
import { formatNumberTime } from '../../../../lib/utils/time.ts';
import dayjs from 'dayjs';

const DeadlineSection = ({ deadline }: { deadline: Date }) => {
  const [diff, setDiff] = useState<number>(dayjs(deadline).diff(dayjs()));
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(dayjs(deadline).diff(dayjs()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-crews-b01 py-6">
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
        <p className="text-2xl font-semibold text-crews-bk01">{`D-${day}`}</p>
        <p className="text-3xl font-bold text-crews-b05">
          {formatNumberTime(diff)}
        </p>
      </div>
      <p className="text-crews-g04">
        {`마감일자 : ${dayjs(deadline).format('YYYY-MM-DD HH:mm:ss')}`}
      </p>
    </section>
  );
};

export default DeadlineSection;
