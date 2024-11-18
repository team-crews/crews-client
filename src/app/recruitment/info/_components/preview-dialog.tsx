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
      className="w-[calc(100vw-1rem)] max-w-[48rem] rounded-lg"
      type="ALERT"
      action={() => dialogProps.toggleOpen()}
    >
      <div className="w-full">{children}</div>
    </CrewsDialog>
  );
};

export default PreviewDialog;
