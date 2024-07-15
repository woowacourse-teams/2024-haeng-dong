import {RefObject, useEffect, useState} from 'react';

interface UseInputProps<T> {
  propsValue: T;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export const useInput = <T>({propsValue, onChange, inputRef}: UseInputProps<T>) => {
  const [value, setValue] = useState(propsValue || '');

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
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return {value, handleChange, handleClickDelete};
};
