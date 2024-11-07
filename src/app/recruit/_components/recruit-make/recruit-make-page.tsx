import { FormProvider, useForm } from 'react-hook-form';

import SectionBoxes from './details/section-boxes.tsx';
import Container from '../../../../components/atom/container.tsx';
import HeaderSection from './header-section.tsx';
import FooterSection from './footer-section.tsx';
import RecruitMetaSection from './details/recruit-meta-section.tsx';
import { useEffect } from 'react';
import Loading from '../../../../components/atom/loading.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import { CREATED_RECRUITMENT } from '../../../../lib/types/default-data.ts';
import { z } from 'zod';
import {
  CreatedRecruitmentSchema,
  RecruitmentSchema,
} from '../../../../lib/types/schemas/recruitment-schema.ts';
import { throwCustomError } from '../../../../lib/utils/error.ts';
import {
  convertRecruitmentToCreatedRecruitment,
  convertSeoulToUTC,
} from '../../../../lib/utils/convert.ts';

const RecruitMakePage = () => {
  const methods = useForm<z.infer<typeof CreatedRecruitmentSchema>>({
    defaultValues: CREATED_RECRUITMENT,
  });

  const { readRecruitment } = useAdminApi();
  const readQuery = useQuery({
    queryKey: ['recruitment'],
    queryFn: readRecruitment,
    staleTime: 0,
  });

  const updateRecruitment = (data: z.infer<typeof RecruitmentSchema>) => {
    data.deadline = convertSeoulToUTC(data.deadline);
    methods.reset(convertRecruitmentToCreatedRecruitment(data));
  };

  useEffect(() => {
    if (readQuery.isFetching || readQuery.isPending) return;
    if (readQuery.data) updateRecruitment(readQuery.data);
  }, [readQuery.data]);

  if (readQuery.isFetching || readQuery.isPending) return <Loading />;
  else if (readQuery.isSuccess)
    return (
      <Container className="flex h-auto flex-col gap-8 py-8">
        <HeaderSection />
        <FormProvider {...methods}>
          <RecruitMetaSection />
          <SectionBoxes />
          <FooterSection updateRecruitment={updateRecruitment} />
        </FormProvider>
      </Container>
    );
  else throwCustomError(readQuery.error, 'readRecruitment');
};

export default RecruitMakePage;
