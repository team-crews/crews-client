// import QuestionIcon from '../../../assets/icons/question-icon';
import SvgIcon from '../../shared/svg-icon';
import QuestionIcon from '../../../assets/icons/question-icon.svg';

const ApplicationWaitPage = () => {
  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex flex-row gap-[0.5rem]">
        <p className="text-[1.75rem] font-bold text-crews-bk02">모집 대기</p>
        <SvgIcon src={QuestionIcon} className="w-[1.5rem]" />
      </div>
      <div className="text-[1rem] font-normal text-crews-g05">
        모집을 위한 지원서를 생성하는 페이지입니다.
        <br />
        공통 섹션과 섹션 내 4개의 문항은 평가 및 합격 이메일 전달을 위해
        사용됩니다.
      </div>
    </div>
  );
};

export default ApplicationWaitPage;
