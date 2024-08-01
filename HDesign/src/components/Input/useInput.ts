import {RefObject, useEffect, useState} from 'react';

interface UseInputProps<T> {
  propsValue: T;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export const useInput = <T>({propsValue, onChange, inputRef}: UseInputProps<T>) => {
  const [value, setValue] = useState(propsValue as string);
  const [hasFocus, setHasFocus] = useState(inputRef.current === document.activeElement);

  useEffect(() => {
    setValue(propsValue as string);
  }, [value]);

  useEffect(() => {
    inputRef.current?.addEventListener('focus', () => setHasFocus(true));
    inputRef.current?.addEventListener('blur', () => setHasFocus(false));
    inputRef.current?.addEventListener('keydown', () => handleKeyDown);

    return () => {
      inputRef.current?.removeEventListener('focus', () => setHasFocus(true));
      inputRef.current?.removeEventListener('blur', () => setHasFocus(false));
      inputRef.current?.addEventListener('keydown', () => handleKeyDown);
    };
  }, []);

  const handleClickDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    setValue('');
    if (onChange) {
      onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    if (event.key === 'Enter' || event.key === 'Escape') {
      setHasFocus(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return {value, handleChange, hasFocus, handleClickDelete};
};
