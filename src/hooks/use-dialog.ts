import { useState } from 'react';

const useDialog = (initOpen = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initOpen);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleOpen };
};

export default useDialog;
