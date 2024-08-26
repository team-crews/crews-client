import Typography from '../../../../../components/shared/typography';
import useRecruitFormContext from '../../../../../hooks/use-recruit-form-context';
import FormSection from './form-section';

const RecruitMakePage = () => {
  const { sections, recruitment } = useRecruitFormContext();

  return (
    <div className="w-[47.5rem]">
      <div className="flex flex-col gap-[0.5rem]">
        <Typography>{`모집공고 제목: ${recruitment.title}`}</Typography>
        <Typography>{`모집공고 설명: ${recruitment.description}`}</Typography>
        <Typography>{`마감기한: ${recruitment.deadline}`}</Typography>
      </div>
      <div className="mt-[0.5rem] flex flex-col gap-[0.5rem]">
        {sections.map((section) => (
          <FormSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default RecruitMakePage;
