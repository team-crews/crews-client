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
            모집 마감 전까지 자유롭게 제출 가능하며 제출된 지원서는 저장됩니다.
          </p>
          <p className="text-base font-light">
            모집 마감 이후에는 지원서를 제출할 수 없으니 주의해주세요 😱
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
