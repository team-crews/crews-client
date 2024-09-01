import Container from '../../../../components/shared/container.tsx';
import HeaderSection from './header-section.tsx';
import CompetitionRateSection from './competition-rate-section.tsx';
import ApplicationOverviewSection from './application-overview-section.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import FooterContainer from '../../../../components/shared/footer-container.tsx';

const RecruitCompletePage = () => {
  return (
    <Container>
      <HeaderSection />
      <div className="my-8 flex flex-col gap-8">
        <CompetitionRateSection />
        <ApplicationOverviewSection />
      </div>
      <FooterContainer className="flex w-full justify-end">
        <Button size="lg">임시 저장</Button>
        <Button size="lg">평가 완료</Button>
      </FooterContainer>
    </Container>
  );
};

export default RecruitCompletePage;
