import { useEffect } from 'react';

const useAutosizeTextArea = (name: string, value: string) => {
  useEffect(() => {
    const textarea = document.querySelector(
      `textarea[name=${name.replace(/\./g, '\\.')}]`,
    ) as HTMLTextAreaElement;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
    }
  }, [name, value]);
};

export default useAutosizeTextArea;
