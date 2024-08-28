import useBreakpoints from '../../../../../hooks/use-breakpoints.ts';
import Typography from '../../../../../components/shared/typography.tsx';

const ApplicantSection = () => {
  const { isSmaller } = useBreakpoints({ breakpoint: 'md' });

  return (
    <section className="flex w-full items-center justify-center gap-[0.625rem] rounded-[0.625rem] bg-crews-b01 px-[6rem] py-[1.5rem]">
      <Typography className="text-[1.875rem] font-semibold text-crews-bk02">
        현재
      </Typography>
      <Typography className="text-[2.5rem] font-bold text-crews-b05">
        {/* TODO: get applicant number */}
        12
      </Typography>
      <Typography className="text-[1.875rem] font-semibold text-crews-b05">
        {isSmaller ? '명 지원 🤗' : '명이 지원했어요 🤗'}
      </Typography>
    </section>
  );
};

export default ApplicantSection;
