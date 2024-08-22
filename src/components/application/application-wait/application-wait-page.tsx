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
    </div>
  );
};

export default ApplicationWaitPage;
