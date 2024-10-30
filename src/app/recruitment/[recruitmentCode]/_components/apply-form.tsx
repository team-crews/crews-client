const ApplyForm = () => <div>hello</div>;

// type ApplyInputs = {
//   email: string;
//   password: string;
// };

// const ApplyForm = () => {
//   const navigate = useNavigate();
//   const { recruitmentCode } = useParams();
//
//   const { toast } = useToast();
//   const [error, setError] = useState<boolean>(false);
//
//   const { setSession } = useSession();
//
//   const { register, resetField, handleSubmit, formState } =
//     useForm<ApplyInputs>({
//       defaultValues: {
//         email: '',
//         password: '',
//       },
//     });
//
//   const onSubmit: SubmitHandler<ApplyInputs> = async (data) => {
//     const emailValidation = validateEmail(data.email);
//     const passwordValidation = validatePassword(data.password);
//
//     if (emailValidation || passwordValidation) {
//       toast({
//         title: emailValidation || passwordValidation,
//         state: 'error',
//       });
//       setError(true);
//       return;
//     }
//
//     try {
//       const { accessToken, username } = await applicantSignIn(data);
//
//       if (recruitmentCode)
//         localStorage.setItem('recruitmentCode', recruitmentCode);
//
//       setSession(accessToken, username);
//       navigate(`/apply/${recruitmentCode}`);
//     } catch (e) {
//       const errorStatus = printCustomError(e, 'applicantLogin');
//
//       let title = '예기치 못한 문제가 발생했습니다.';
//       if (errorStatus === 401) title = '잘못된 비밀번호입니다.';
//
//       toast({
//         title,
//         state: 'error',
//       });
//
//       setError(true);
//     }
//   };
//
//   const inputState: Record<keyof ApplyInputs, InputState> = {
//     email: error ? 'error' : formState.dirtyFields.email ? 'filled' : 'empty',
//     password: error
//       ? 'error'
//       : formState.dirtyFields.password
//         ? 'filled'
//         : 'empty',
//   };
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full">
//       <fieldset className="mb-3">
//         <Input
//           state={inputState.email}
//           className="mb-3"
//           registerReturns={register('email', {
//             onChange: () => {
//               setError(false);
//             },
//           })}
//           clearInput={() => {
//             resetField('email');
//             setError(false);
//           }}
//           placeholder="이메일"
//         />
//         <Input
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
//         지원하기
//       </Button>
//     </form>
//   );
// };

export default ApplyForm;
