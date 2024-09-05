import Container from '../../../components/shared/container';

const Page = () => {
  // const { toast } = useToast();
  // const navigate = useNavigate();
  //
  // const { 'recruitment-code': recruitmentCode } = useParams();
  //
  // const { readApplication } = useApplicantApi(recruitmentCode || '');

  // /** 저장된 값 없을 시 default로 set 하도록 에러 핸들링 */
  // const { data } = useQuery({
  //   queryKey: ['readApplication', recruitmentCode],
  //   queryFn: async () => {
  //     try {
  //       return await readApplication();
  //     } catch (e) {
  //       const errorStatus = handleError(e, 'readApplication');

  //       // 저장된 지원 정보가 없을 시 404 (추후 status 변경 예정)
  //       if (errorStatus === 404) {
  //         return;
  //       }

  //       navigate('/error');
  //     }
  //   },
  //   enabled: !!recruitmentCode,
  // });

  return (
    <Container>
      <div>
        <h1>Section 1</h1>
        <p>Section 1 description</p>
      </div>
    </Container>
  );
};

export default Page;
