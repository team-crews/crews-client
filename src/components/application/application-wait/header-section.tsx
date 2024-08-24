import QuestionIcon from '@/assets/icons/question-icon.svg';
import SvgIcon from '../../shared/svg-icon';
import Typography from '../../shared/typography';

const HeaderSection = () => {
  return (
    <section className="my-[2.5rem] p-[1rem] md:p-0">
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-row gap-[0.5rem]">
          <Typography className="text-[1.75rem] font-bold text-crews-bk02">
            모집 대기
          </Typography>
          <SvgIcon src={QuestionIcon} className="w-[1.5rem]" />
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <Typography className="text-crews-g05">
            모집을 위한 지원서를 생성하는 페이지입니다.
          </Typography>
          <Typography className="break-words text-crews-g05">
            공통 섹션과 섹션 내 4개의 문항은 평가 및 합격 이메일 전달을 위해
            사용됩니다.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
