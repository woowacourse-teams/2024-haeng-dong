/** @jsxImportSource @emotion/react */

import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import Input from '../Input/Input';

import {ElementProps} from './Element.type';
import {useGroupInputContext} from './GroupInputContext';

const Element: React.FC<ElementProps> = forwardRef<HTMLInputElement, ElementProps>(function Element(
  {elementKey, value: propsValue, onChange, onBlur, onFocus, isError, autoFocus, ...htmlProps}: ElementProps,

  ref,
) {
  useImperativeHandle(ref, () => inputRef.current!);
  const inputRef = useRef<HTMLInputElement>(null);
  const {setHasAnyFocus, values, setValues, hasAnyErrors, setHasAnyErrors} = useGroupInputContext();

  useEffect(() => {
    setValues({...values, [elementKey]: `${propsValue}`});
  }, [propsValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValues({...values, [elementKey]: newValue});
    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    setHasAnyErrors({...hasAnyErrors, [elementKey]: isError ?? false});
  }, [isError]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasAnyFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasAnyFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <Input
      ref={inputRef}
      isError={isError}
      value={propsValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      autoFocus={autoFocus}
      {...htmlProps}
    />
  );
});

export default Element;
