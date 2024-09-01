import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import SectionBox from './section-box.tsx';
import {
  CREATED_RECRUITMENT_MOCK,
  formMockData,
} from '../../../../lib/mock.ts';
import { PostRecruitmentsBody } from '../../../../lib/types/recruitments.ts';
import Container from '../../../../components/shared/container.tsx';
import HeaderSection from './header-section.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import FooterContainer from '../../../../components/shared/footer-container.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAdminApi from '../../../../apis/admin-api.ts';
import { ICreatedRecruitment } from '../../../../lib/model/i-recruitment.ts';
import handleError from '../../../../lib/utils/error.ts';
import { useToast } from '../../../../hooks/use-toast.ts';

const RecruitMakePage = () => {
  const methods = useForm<PostRecruitmentsBody>({
    // FIXME: api 연결 시 defaultValues mock data 삭제
    defaultValues: formMockData,
  });

  const {
    control,
    register,
    handleSubmit,
    // reset
  } = methods;

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: 'sections',
  });

  // TODO: react query 로 get 요청 후 default 값으로 reset
  // const { data, isLoading, error } = useQuery(['getRecruitmentsReady'], getRecruitmentsReady, {
  //   onSuccess: (data) => {
  //     reset(data);
  //   },
  // });

  const queryClient = useQueryClient();
  const { saveRecruitment, startRecruitment } = useAdminApi();
  const createMutation = useMutation({
    mutationFn: (requestBody: ICreatedRecruitment) =>
      saveRecruitment(requestBody),
  });

  const patchMutation = useMutation({
    mutationFn: startRecruitment,
  });

  const { toast } = useToast();
  const handleStartRecruitmentClick = async () => {
    try {
      await createMutation.mutateAsync(CREATED_RECRUITMENT_MOCK);
      await patchMutation.mutateAsync();
      await queryClient.invalidateQueries({
        queryKey: ['recruitmentProgress'],
      });
    } catch (e) {
      handleError(e, 'saveRecruitment or patchMutation', 'PRINT');
      toast({
        title: '예기치 못한 문제가 발생했습니다.',
        state: 'error',
      });
    }

    /*
      ToDo
      - isPending 에 대해 loading 화면 처리
     */
  };

  return (
    <Container>
      <HeaderSection />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="flex flex-col gap-[0.5rem]">
            <input {...register('title')} />
            <input {...register('description')} />
            {/* TODO: deadline 은 따로 patch 해야함 */}
            <div>{`마감기한: ${formMockData.deadline}`}</div>
          </div>
          <div className="mt-[0.5rem] flex flex-col gap-[0.5rem]">
            {sectionFields.map((section, sectionIndex) => (
              <SectionBox
                key={section.id}
                sectionIndex={sectionIndex}
                removeSection={removeSection}
              />
            ))}
          </div>
          <button
            onClick={() =>
              appendSection({
                id: null,
                name: '새로운 섹션',
                description: '새로운섹션 설명',
                questions: [],
              })
            }
          >
            {'섹션 추가'}
          </button>
          <button className="border-[0.125rem] border-crews-b06" type="submit">
            {'제출'}
          </button>
        </form>
      </FormProvider>
      <FooterContainer className="flex w-full justify-end">
        <Button size="lg">임시 저장</Button>
        <Button size="lg" onClick={handleStartRecruitmentClick}>
          모집 시작
        </Button>
      </FooterContainer>
    </Container>
  );
};

export default RecruitMakePage;
