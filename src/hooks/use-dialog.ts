import { useState } from 'react';

const useDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleOpen };
};

export default useDialog;
