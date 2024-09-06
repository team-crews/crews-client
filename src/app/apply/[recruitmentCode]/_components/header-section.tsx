import ThumbTackIcon from '../../../../assets/icons/thumbtack-icon.svg?react';

const HeaderSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-crews-bk02">
          <ThumbTackIcon className="h-5 w-5" />
          <p className="text-2xl font-bold">지원서 작성하기</p>
        </div>
        <div className="flex flex-col gap-1 text-crews-g05">
          <p className="text-base font-light">
            지원서는 모집 기간 이후 수정이 불가능하니 신중하게 작성해주세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
