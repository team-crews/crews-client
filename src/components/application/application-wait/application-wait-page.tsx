import FooterContainer from '../../shared/footer-container';
import { Button } from '../../ui/button';
import ApplicantSection from './applicant-section';
import ClipboardSection from './clipboard-section';
import DeadlineSection from './deadline-section';
import HeaderSection from './header-section';

const ApplicationWaitPage = () => {
  return (
    <div className="w-[43.75rem]">
      <HeaderSection />
      <div className="flex flex-col gap-[6.25rem] py-[6rem]">
        <ClipboardSection />
        <ApplicantSection />
        <DeadlineSection />
      </div>
      <FooterContainer className="flex w-full justify-end">
        <Button variant={'default'}>마감 연장하기</Button>
      </FooterContainer>
    </div>
  );
};

export default ApplicationWaitPage;
