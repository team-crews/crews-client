import Container from '../components/shared/container.tsx';
import Seperator from '../components/shared/seperator.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../components/shared/input.tsx';
import { useNavigate } from 'react-router-dom';
import AnchorIcon from '../assets/icons/anchor-icon.tsx';

type RecruitmentInput = {
  recruitmentCode: string;
};

type RecruiterInputs = {
  recruiterName: string;
  recruiterPassword: string;
};

const Page = () => {
  const navigate = useNavigate();

  const {
    register: recruitmentRegister,
    resetField: recruitmentResetField,
    handleSubmit: recruitmentHandleSubmit,
  } = useForm<RecruitmentInput>({
    defaultValues: {
      recruitmentCode: '',
    },
  });
  const onRecruitmentSubmit: SubmitHandler<RecruitmentInput> = ({
    recruitmentCode,
  }) => {
    navigate(`/recruitment/${recruitmentCode}`);
  };

  const {
    register: recruiterRegister,
    resetField: recruiterResetField,
    handleSubmit: recruiterHandleSubmit,
  } = useForm<RecruiterInputs>({
    defaultValues: {
      recruiterName: '',
      recruiterPassword: '',
    },
  });
  const onRecruiterSubmit: SubmitHandler<RecruiterInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container className="flex items-center justify-center">
      <div>
        <div>
          <p>누구나 쉽게 모집 · 지원</p>
          <h1>Crews</h1>
          <AnchorIcon className="h-4 w-4" />
        </div>

        <form onSubmit={recruitmentHandleSubmit(onRecruitmentSubmit)}>
          <fieldset>
            <legend>지원하기</legend>
            <Input
              registerReturns={recruitmentRegister('recruitmentCode', {
                required: true,
              })}
              handleXClick={() => recruitmentResetField('recruitmentCode')}
              placeholder="모집공고 코드"
            />
          </fieldset>
          <button>지원하기</button>
        </form>

        <Seperator orientation="horizontal" className="bg-black" />

        <form onSubmit={recruiterHandleSubmit(onRecruiterSubmit)}>
          <fieldset>
            <legend>모집하기</legend>
            <Input
              registerReturns={recruiterRegister('recruiterName', {
                required: true,
              })}
              handleXClick={() => recruiterResetField('recruiterName')}
              placeholder="동아리명"
            />
            <Input
              type="password"
              registerReturns={recruiterRegister('recruiterPassword', {
                required: true,
              })}
              handleXClick={() => recruiterResetField('recruiterPassword')}
              placeholder="비밀번호"
            />
          </fieldset>
          <button>모집하기</button>
        </form>
      </div>
    </Container>
  );
};

export default Page;
