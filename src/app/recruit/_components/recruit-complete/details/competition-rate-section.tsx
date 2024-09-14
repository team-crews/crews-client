const CompetitionRateSection = ({
  passedNumber,
  totalNumber,
}: {
  passedNumber: number;
  totalNumber: number;
}) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-crews-b01 py-6">
      <p className="text-2xl font-semibold text-crews-bk01">
        지원자{' '}
        <span className="text-3xl font-bold text-crews-b05">{totalNumber}</span>{' '}
        명 중
        <span className="text-3xl font-bold text-crews-b05">
          {' '}
          {passedNumber}
        </span>{' '}
        명이 합격했어요 🎉
      </p>
      <p className="text-crews-g04">
        {passedNumber === 0
          ? '경쟁률 계산을 위해 합격자를 선택해주세요'
          : (() => {
              const ratio = totalNumber / passedNumber - 1;
              const formattedRatio = Number(ratio.toFixed(2));
              return `현재 경쟁률은 ${formattedRatio} : 1 입니다`;
            })()}
      </p>
    </section>
  );
};

export default CompetitionRateSection;
