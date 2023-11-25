import { useEffect } from 'react';
const useAutoSizeTextArea = (
  textAreaRef: React.MutableRefObject<HTMLElement | undefined | null>,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
};

export default useAutoSizeTextArea;
