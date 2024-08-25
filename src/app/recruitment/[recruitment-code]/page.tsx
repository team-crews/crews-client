import Container from '../../../components/shared/container.tsx';
import ApplyForm from './_components/apply-form.tsx';
import { Skeleton } from '../../../components/shared/skeleton.tsx';

const Page = () => {
  return (
    <Container className="0 flex gap-10">
      <section className="flex flex-grow items-center justify-center">
        <div className="mb-10 w-full max-w-[375px]">
          <ApplyForm />
        </div>
      </section>
      <section className="overflow-scroll">
        <Skeleton className="mx-auto mb-12 mt-[120px] h-[500px] w-[600px]" />
        <Skeleton className="mx-auto mb-12 h-[300px] w-[600px]" />
        <Skeleton className="mx-auto h-96 w-[600px]" />
      </section>
    </Container>
  );
};

export default Page;
