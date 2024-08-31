import ThumbTackIcon from '../../../../assets/icons/thumbtack-icon.svg?react';

const HeaderSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-crews-bk02">
          <ThumbTackIcon className="h-5 w-5" />
          <p className="text-[28px] font-bold">지원서 평가하기</p>
        </div>
        <div className="flex flex-col gap-1 text-crews-g05">
          <p className="text-base font-normal">
            모집에 지원한 지원자들을 평가합니다. 하단의 '평가 완료' 버튼을 눌러
            합격의 소식을 전달하세요.
          </p>
          <p className="text-base font-normal">
            평가가 완료되지 않았다면 하단의 '임시 저장'을 눌러주세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
