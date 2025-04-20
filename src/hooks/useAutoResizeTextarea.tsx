import { useEffect, RefObject } from 'react';

export function useAutoResizeTextarea(
  textareaRef: RefObject<HTMLTextAreaElement>
) {
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleResize = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    handleResize(); // 초기 높이 설정

    textarea.addEventListener('input', handleResize);

    return () => {
      textarea.removeEventListener('input', handleResize);
    };
  }, [textareaRef]);
}
