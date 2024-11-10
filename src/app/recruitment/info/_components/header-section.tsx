import ThumbTackIcon from '../../../../assets/icons/thumbtack-icon.svg?react';

const HeaderSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-crews-bk02">
          <ThumbTackIcon className="h-5 w-5" />
          <p className="text-2xl font-bold">모집 공고 조회</p>
        </div>
        <div className="flex flex-col gap-1 text-crews-g05">
          <p className="text-base font-light">
            하단의 '지원하기'를 눌러 원하는 모집에 지원해보세요!
          </p>
          <p className="text-base font-light">
            또한 '지원서 미리보기'를 눌러 지원서의 내용을 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
