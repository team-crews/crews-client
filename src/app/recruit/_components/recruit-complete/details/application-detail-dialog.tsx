import CrewsDialog from '../../../../../components/molecule/crews-dialog.tsx';
import useAdminApi from '../../../../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../../components/atom/loading.tsx';
import { throwCustomError } from '../../../../../lib/utils/error.ts';
import SectionBoxes from '../../../../../components/recruitment-view/section-boxes.tsx';

type Props = {
  applicationId: number;
  isOpen: boolean;
  toggleOpen: () => void;
};

const ApplicationDetailDialog = ({ applicationId, ...dialogProps }: Props) => {
  const { readRecruitment, readApplicationDetail } = useAdminApi();

  const recruitmentQuery = useQuery({
    queryKey: ['recruitment', 'complete'],
    queryFn: readRecruitment,
    staleTime: Infinity,
  });

  const applicationQuery = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => readApplicationDetail(applicationId),
    staleTime: Infinity,
  });

  if (recruitmentQuery.isFetching || applicationQuery.isFetching)
    return <Loading />;
  else if (
    recruitmentQuery.isSuccess &&
    applicationQuery.isSuccess &&
    recruitmentQuery.data
  )
    return (
      <CrewsDialog
        {...dialogProps}
        type="ALERT"
        action={() => dialogProps.toggleOpen()}
      >
        <div className="w-[600px]">
          <SectionBoxes
            sections={recruitmentQuery.data.sections}
            answersBySection={applicationQuery.data.sections}
          />
        </div>
      </CrewsDialog>
    );
  else
    throwCustomError(
      recruitmentQuery.error || applicationQuery.error,
      'recruitmentQuery or applicationQuery',
    );
};

export default ApplicationDetailDialog;
