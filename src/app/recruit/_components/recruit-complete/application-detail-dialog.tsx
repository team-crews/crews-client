import Dialog from '../../../../components/shared/dialog.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../components/shared/loading.tsx';
import { printCustomError } from '../../../../lib/utils/error.ts';
import { Navigate } from 'react-router-dom';

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
  else if (recruitmentQuery.isError) {
    printCustomError(recruitmentQuery.error, 'recruitmentQuery');
    return <Navigate to="/error" replace />;
  } else if (applicationQuery.isError) {
    printCustomError(applicationQuery.error, 'applicationQuery');
    return <Navigate to="/error" replace />;
  }
  return (
    <Dialog {...dialogProps}>
      <h1>내용들어가야됨</h1>
    </Dialog>
  );
};

export default ApplicationDetailDialog;
