import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import SectionBox from './section-box';
import { formMockData } from '../../../../../lib/mock';
import { PostRecruitmentsBody } from '../../../../../lib/types/recruitments';

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

  // TODO: react query로 get 요청 후 default 값으로 reset
  // const { data, isLoading, error } = useQuery(['getRecruitmentsReady'], getRecruitmentsReady, {
  //   onSuccess: (data) => {
  //     reset(data);
  //   },
  // });

  return (
    <div className="w-[47.5rem]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="flex flex-col gap-[0.5rem]">
            <input {...register('title')} />
            <input {...register('description')} />
            {/* TODO: deadline은 따로 patch해야함 */}
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
          <div className="flex w-full justify-center">
            <button
              className="mt-[2rem] border-b-[1px] border-crews-g06 pb-[1px] text-[1.125rem] leading-[1.5rem] text-crews-g06"
              onClick={() =>
                appendSection({
                  id: null,
                  name: '새로운 섹션',
                  description: '새로운 섹션의 설명을 작성해주세요',
                  questions: [],
                })
              }
            >
              섹션 추가
            </button>
          </div>
          <button className="border-[0.125rem] border-crews-b06" type="submit">
            {'제출'}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default RecruitMakePage;
