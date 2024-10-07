import CommentIcon from '../../../assets/icons/comment-icon.svg?react';

const AdminSignUp = () => {
  return (
    <a
      href={import.meta.env.VITE_KAKAO_ADMIN_CHAT}
      target="_blank"
      className="flex w-full items-center justify-center gap-2 rounded bg-[#2F3234] py-2 text-sm font-bold tracking-widest text-crews-w01 hover:bg-crews-bk02"
    >
      <CommentIcon className="h-4 w-4" />
      모집자 가입 문의
    </a>
  );
};

/*
  FixMe
  - 혹시 필요할까봐 남겨놓은 코드들
 */

// type RecruitInputs = {
//   clubName: string;
//   password: string;
// };
//
// const AdminSignUp = () => {
//   const { toast } = useToast();
//   const [error, setError] = useState<boolean>(false);
//
//   const { register, resetField, handleSubmit, formState } =
//     useForm<RecruitInputs>({
//       defaultValues: {
//         clubName: '',
//         password: '',
//       },
//     });
//
//   const navigate = useNavigate();
//   const { setSession } = useSession();
//   const onSubmit: SubmitHandler<RecruitInputs> = async (data) => {
//     const clubNameValidation = validateClubName(data.clubName);
//     const passwordValidation = validatePassword(data.password);
//
//     if (clubNameValidation || passwordValidation) {
//       toast({
//         title: clubNameValidation || passwordValidation,
//         state: 'error',
//       });
//       setError(true);
//       return;
//     }
//
//     try {
//       const { accessToken, username } = await adminLogin(data);
//       setSession(accessToken, username);
//       navigate('/recruit');
//     } catch (e) {
//       const errorStatus = printCustomError(e, 'adminLogin');
//
//       let title = '예기치 못한 문제가 발생했습니다.';
//       if (errorStatus === 401) title = '잘못된 비밀번호입니다.';
//       toast({
//         title,
//         state: 'error',
//       });
//       setError(true);
//     }
//   };
//
//   const inputState: Record<keyof RecruitInputs, InputState> = {
//     clubName: error
//       ? 'error'
//       : formState.dirtyFields.clubName
//         ? 'filled'
//         : 'empty',
//     password: error
//       ? 'error'
//       : formState.dirtyFields.password
//         ? 'filled'
//         : 'empty',
//   };
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <fieldset className="mb-3">
//         <Input
//           maxLength={30}
//           state={inputState.clubName}
//           className="mb-3"
//           registerReturns={register('clubName', {
//             onChange: () => {
//               setError(false);
//             },
//           })}
//           clearInput={() => {
//             resetField('clubName');
//             setError(false);
//           }}
//           placeholder="동아리명"
//         />
//         <Input
//           maxLength={30}
//           state={inputState.password}
//           type="password"
//           registerReturns={register('password', {
//             onChange: () => {
//               setError(false);
//             },
//           })}
//           clearInput={() => {
//             resetField('password');
//             setError(false);
//           }}
//           placeholder="비밀번호"
//         />
//       </fieldset>
//
//       <Button className="w-full" disabled={error}>
//         모집자 가입하기
//       </Button>
//     </form>
//   );
// };
//
export default AdminSignUp;
