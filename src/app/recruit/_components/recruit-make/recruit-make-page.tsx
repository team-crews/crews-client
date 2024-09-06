import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import SectionBoxes from './details/section-boxes.tsx';
import Container from '../../../../components/shared/container.tsx';
import HeaderSection from './header-section.tsx';
import FooterSection from './footer-section.tsx';
import {
  CREATED_RECRUITMENT,
  ICreatedRecruitment,
} from '../../../../lib/model/i-recruitment.ts';
import RecruitMetaSection from './details/recruit-meta-section.tsx';
import { CREATED_SECTION } from '../../../../lib/model/i-section.ts';
import { useEffect, useState } from 'react';
import { printCustomError } from '../../../../lib/utils/error.ts';
import { Navigate } from 'react-router-dom';
import Loading from '../../../../components/shared/loading.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useToast } from '../../../../hooks/use-toast.ts';

const RecruitMakePage = () => {
  const methods = useForm<ICreatedRecruitment>({
    defaultValues: CREATED_RECRUITMENT,
  });
  const [recruitmentCode, setRecruitmentCode] = useState<string | null>(null);

  const {
    fields: sectionFields,
    append,
    remove: removeSection,
  } = useFieldArray({
    control: methods.control,
    name: 'sections',
  });

  const { toast } = useToast();
  const appendSection = () => {
    if (sectionFields.length === 6) {
      toast({
        title: '섹션은 최대 5개 까지만 추가가능 합니다.',
        state: 'warning',
      });
      return;
    }
    append(CREATED_SECTION);
  };

  const { readRecruitment } = useAdminApi();
  const readQuery = useQuery({
    queryKey: ['recruitment'],
    queryFn: readRecruitment,
  });

  useEffect(() => {
    if (!readQuery.isSuccess) return;
    if (readQuery.data) {
      methods.reset({
        ...readQuery.data,
        deadline: dayjs(readQuery.data.deadline).format('YY-MM-DD-HH'),
      });
      setRecruitmentCode(readQuery.data.code);
    }
  }, [readQuery.isSuccess]);

  if (readQuery.isFetching) return <Loading />;
  else if (readQuery.isError) {
    printCustomError(readQuery.error, 'readQuery');
    return <Navigate to="/error" replace />;
  }
  return (
    <Container>
      <HeaderSection />

      <FormProvider {...methods}>
        <form className="pb-[6rem]">
          <section className="mt-6">
            <RecruitMetaSection />
          </section>
          <section className="mt-6">
            <SectionBoxes
              sectionFields={sectionFields}
              removeSection={removeSection}
            />
          </section>
          <section className="flex w-full justify-center">
            <button
              type="button"
              className="mt-9 text-lg font-light text-crews-g04 underline underline-offset-[4px] hover:text-crews-g06"
              onClick={appendSection}
            >
              섹션 추가하기
            </button>
          </section>
        </form>

        <FooterSection recruitmentCode={recruitmentCode} />
      </FormProvider>
    </Container>
  );
};

export default RecruitMakePage;
