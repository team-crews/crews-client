import ThumbTackIcon from '../../../../assets/icons/thumbtack-icon.svg?react';

const HeaderSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-crews-bk02">
          <ThumbTackIcon className="h-5 w-5" />
          <p className="text-2xl font-bold">지원서 생성하기</p>
        </div>
        <div className="flex flex-col gap-1 text-crews-g05">
          <p className="text-base font-light">
            모집을 위한 지원서를 생성합니다. 하단의 '모집 시작' 버튼을 눌러
            모집을 시작하세요.
          </p>
          <p className="text-base font-light">
            추가적인 작업이 필요하다면 꼭 하단의 '저장'을 눌러주세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
