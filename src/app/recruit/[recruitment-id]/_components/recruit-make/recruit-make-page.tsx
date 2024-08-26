import useRecruitFormContext from '../../../../../hooks/use-recruit-form-context';
import FormSection from './form-section';

const RecruitMakePage = () => {
  const { sections } = useRecruitFormContext();

  return (
    <div>
      {sections.map((section) => (
        <FormSection key={section.id} section={section} />
      ))}
    </div>
  );
};

export default RecruitMakePage;
