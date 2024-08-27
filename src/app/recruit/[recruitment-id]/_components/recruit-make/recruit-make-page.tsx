import { useFieldArray, useForm } from 'react-hook-form';
import Typography from '../../../../../components/shared/typography';

import SectionBox from './section-box';
import { formMockData } from '../../../../../lib/mock';

const RecruitMakePage = () => {
  const { control, handleSubmit, register, reset } = useForm({
    // FIXME: api 연결 시 defaultValues 삭제
    defaultValues: formMockData,
  });

  // sections 필드를 관리하기 위해 useFieldArray를 사용합니다.
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: 'sections',
  });

  // TODO: react query로 get 요청 후 default 값으로 reset
  // const { data, isLoading, error } = useQuery(['recruitmentData'], fetchRecruitmentData, {
  //   onSuccess: (data) => {
  //     reset(data); // 가져온 데이터를 폼의 기본 값으로 설정
  //   },
  // });

  return (
    <div className="w-[47.5rem]">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="flex flex-col gap-[0.5rem]">
          <input {...register('title')} />
          <input {...register('description')} />
          {/* TODO: deadline은 따로 patch해야함 */}
          <div>{`마감기한: ${formMockData.deadline}`}</div>
        </div>
        <div className="mt-[0.5rem] flex flex-col gap-[0.5rem]">
          {sectionFields.map((section) => (
            <SectionBox key={section.id} section={section} />
          ))}
        </div>
      </form>
    </div>
  );
};

export default RecruitMakePage;
