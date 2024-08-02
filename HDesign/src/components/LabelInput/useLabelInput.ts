import {RefObject, useEffect, useState} from 'react';

interface UseLabelInput<T> {
  inputRef: RefObject<HTMLInputElement>;
}

export const useLabelInput = <T>({inputRef}: UseLabelInput<T>) => {
  const [hasFocus, setHasFocus] = useState(inputRef.current === document.activeElement);

  useEffect(() => {
    inputRef.current?.addEventListener('focus', () => setHasFocus(true));
    inputRef.current?.addEventListener('blur', () => setHasFocus(false));

    return () => {
      inputRef.current?.removeEventListener('focus', () => setHasFocus(true));
      inputRef.current?.removeEventListener('blur', () => setHasFocus(false));
    };
  }, []);

  return {hasFocus};
};
