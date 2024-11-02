import useAutosizeTextArea from '../../hooks/use-autosize-textarea.ts';

const ReadonlyTextarea = ({ value, name }: { value: string; name: string }) => {
  useAutosizeTextArea(name, value);
  return (
    <textarea
      readOnly
      rows={1}
      value={value}
      name={name}
      className="cursor-default bg-inherit text-xs text-crews-w01"
    />
  );
};

export default ReadonlyTextarea;
