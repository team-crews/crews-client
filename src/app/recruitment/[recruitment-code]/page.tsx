import Container from '../../../components/shared/container.tsx';
import ApplyForm from './_components/apply-form.tsx';

import InfoSection from './_components/info-section.tsx';

const Page = () => {
  return (
    <Container className="0 flex flex-col gap-10 lg:flex-row">
      <section className="mt-14 flex flex-grow items-center justify-center lg:mt-0">
        <div className="mb-10 w-full max-w-[375px]">
          <ApplyForm />
        </div>
      </section>
      <section className="overflow-scroll">
        <InfoSection />
      </section>
    </Container>
  );
};

export default Page;
