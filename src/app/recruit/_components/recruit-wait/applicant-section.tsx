import useBreakpoints from '../../../../hooks/use-breakpoints.ts';

const ApplicantSection = ({
  applicationCount,
}: {
  applicationCount: number;
}) => {
  const { isSmaller } = useBreakpoints({ breakpoint: 'md' });

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-crews-b01 py-6">
      <p className="text-2xl font-semibold text-crews-bk01">
        현재까지{' '}
        <span className="text-3xl font-bold text-crews-b05">
          {applicationCount}명
        </span>{' '}
        {isSmaller ? ' 지원 🤗' : ' 지원했어요 🤗'}
      </p>
      <p className="text-crews-g04">
        지원자 수는 매 시간 자동으로 새로고침 됩니다.
      </p>
    </section>
  );
};

export default ApplicantSection;
