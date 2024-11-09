import CrewsDialog from '../../../../components/molecule/crews-dialog.tsx';

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
};

const PreviewDialog = ({ children, ...dialogProps }: Props) => {
  return (
    <CrewsDialog
      {...dialogProps}
      type="ALERT"
      action={() => dialogProps.toggleOpen()}
    >
      <div className="w-[600px]">{children}</div>
    </CrewsDialog>
  );
};

export default PreviewDialog;
