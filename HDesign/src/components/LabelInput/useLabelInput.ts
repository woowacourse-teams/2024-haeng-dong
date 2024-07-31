import {RefObject, useEffect, useState} from 'react';

interface UseLabelInput<T> {
  inputRef: RefObject<HTMLInputElement>;
  propsValue: T;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useLabelInput = <T>({inputRef, propsValue, onChange}: UseLabelInput<T>) => {
  const [value, setValue] = useState(propsValue || '');
  const [hasFocus, setHasFocus] = useState(inputRef.current === document.activeElement);

  useEffect(() => {
    inputRef.current?.addEventListener('focus', () => setHasFocus(true));
    inputRef.current?.addEventListener('blur', () => setHasFocus(false));

    return () => {
      inputRef.current?.removeEventListener('focus', () => setHasFocus(true));
      inputRef.current?.removeEventListener('blur', () => setHasFocus(false));
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return {value, hasFocus, handleChange};
};
