import { useEffect, useState } from 'react';
import { formatNumberTime, formateDateTime } from '../../../lib/utils/time';
import Typography from '../../shared/typography';

const DeadlineSection = () => {
  // TODO: get deadline from server
  const deadline = new Date('2024-11-11T20:00:00');
  const [today, setToday] = useState(new Date());

  const diff = deadline.getTime() - today.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex w-full items-center justify-center gap-[0.625rem] rounded-[0.625rem] bg-crews-b01 px-[9rem] py-[1.5rem]">
      <div className="flex flex-col items-center justify-center gap-[0.75rem]">
        <div className="flex items-center justify-center gap-[3.125rem]">
          <Typography className="text-[1.875rem] font-semibold text-crews-bk02">
            {`D-${day}`}
          </Typography>
          <Typography className="text-[2.5rem] font-bold text-crews-b05">
            {formatNumberTime(diff)}
          </Typography>
        </div>
        <Typography className="text-[1.25rem] text-crews-g05">
          {`마감일자 : ${formateDateTime(deadline)}`}
        </Typography>
      </div>
    </section>
  );
};

export default DeadlineSection;
