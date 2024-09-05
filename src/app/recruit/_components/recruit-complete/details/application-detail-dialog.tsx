import Dialog from '../../../../../components/shared/dialog.tsx';
import useAdminApi from '../../../../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../../components/shared/loading.tsx';
import { printCustomError } from '../../../../../lib/utils/error.ts';
import { Navigate } from 'react-router-dom';
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
  });

  const applicationQuery = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => readApplicationDetail(applicationId),
  });

  if (recruitmentQuery.isFetching || applicationQuery.isFetching)
    return <Loading />;
  else if (recruitmentQuery.isError || !recruitmentQuery.data) {
    printCustomError(recruitmentQuery.error, 'recruitmentQuery');
    return <Navigate to="/error" replace />;
  } else if (applicationQuery.isError || !applicationQuery.data) {
    printCustomError(applicationQuery.error, 'applicationQuery');
    return <Navigate to="/error" replace />;
  }

  console.log(recruitmentQuery.data, applicationQuery.data);
  return (
    <Dialog {...dialogProps} type="ALERT">
      <SectionBoxes
        sections={recruitmentQuery.data.sections}
        answers={applicationQuery.data.answers}
      />
    </Dialog>
  );
};

export default ApplicationDetailDialog;
