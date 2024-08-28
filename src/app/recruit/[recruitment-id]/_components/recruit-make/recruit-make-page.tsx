import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import SectionBox from './section-box';
import { formMockData } from '../../../../../lib/mock';
import { PostRecruitmentsBody } from '../../../../../lib/types';

const RecruitMakePage = () => {
  const methods = useForm<PostRecruitmentsBody>({
    // FIXME: api 연결 시 defaultValues 삭제
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
    </div>
  );
};

export default RecruitMakePage;
