import ThumbTackIcon from '../../../../assets/icons/thumbtack-icon.svg?react';

const HeaderSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-crews-bk02">
          <ThumbTackIcon className="h-5 w-5" />
          <p className="text-2xl font-bold">지원 준비</p>
        </div>
        <div className="flex flex-col gap-1 text-crews-g05">
          <p className="text-base font-light">
            좌측 미리보기를 통해 지원서를 확인하세요 😚
          </p>
          <p className="text-base font-light">
            합격 메일은 지원 이메일로 전송되니 오타에 주의하세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
