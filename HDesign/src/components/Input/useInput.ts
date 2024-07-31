import {RefObject, useEffect, useState} from 'react';

interface UseInputProps<T> {
  propsValue: T;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export const useInput = <T>({propsValue, onChange, onBlur, onFocus, inputRef}: UseInputProps<T>) => {
  const [value, setValue] = useState(propsValue || '');
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    setValue(propsValue || '');
  }, [propsValue]);

  const handleClickDelete = () => {
    setValue('');

    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (onChange) {
      onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    setValue(e.target.value);
  };

  const handleFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event!);
    }
    setHasFocus(true);
  };

  const handleBlur = (event?: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(event!);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      event.stopPropagation();
    }
    if (event.key === 'Enter' || event.key === 'Escape') {
      handleBlur();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return {value, hasFocus, handleChange, handleClickDelete, handleFocus, handleBlur, handleKeyDown};
};
