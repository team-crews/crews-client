const CompetitionRateSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-crews-b01 py-6">
      <p className="text-2xl font-semibold text-crews-bk01">
        지원자 <span className="text-3xl font-bold text-crews-b05">11</span> 명
        중<span className="text-3xl font-bold text-crews-b05"> 5</span> 명이
        합격했어요 🎉
      </p>
      <p className="text-crews-g04">현재 경쟁률은 2.2 : 1 입니다</p>
    </section>
  );
};

export default CompetitionRateSection;
