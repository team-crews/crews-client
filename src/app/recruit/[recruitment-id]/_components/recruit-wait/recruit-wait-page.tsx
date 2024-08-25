import FooterContainer from '../../../../../components/shared/footer-container';
import { Button } from '../../../../../components/ui/button';
import ApplicantSection from './applicant-section';
import ClipboardSection from './clipboard-section';
import DeadlineSection from './deadline-section';
import HeaderSection from './header-section';

const RecruitWaitPage = () => {
  return (
    <div className="w-[43.75rem]">
      <HeaderSection />
      <div className="flex flex-col gap-[6.25rem] py-[6rem]">
        <ClipboardSection />
        <ApplicantSection />
        <DeadlineSection />
      </div>
      <FooterContainer className="flex w-full justify-end">
        {/* TODO: add onclick event */}
        <Button
          className="h-[3.125rem] w-[12.5rem] rounded-[0.625rem]"
          variant={'default'}
        >
          마감기간 연장하기
        </Button>
      </FooterContainer>
    </div>
  );
};

export default RecruitWaitPage;
