import ThumbTackIcon from '../../../../assets/icons/thumbtack-icon.svg?react';

const HeaderSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-crews-bk02">
          <ThumbTackIcon className="h-5 w-5" />
          <p className="text-2xl font-bold">모집 대기</p>
        </div>
        <div className="flex flex-col gap-1 text-crews-g05">
          <p className="text-base font-light">
            모집 중인 모집 공고를 관리할 수 있습니다. 현재 지원한 지원자의 수를
            확인해 보세요.
          </p>
          <p className="text-base font-light">
            필요 시 마감 기간을 연장하실 수 있지만 마감 일정을 당기는 것은
            불가하니 주의해주세요. 😔
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
