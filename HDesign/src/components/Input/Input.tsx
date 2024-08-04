/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import {useTheme} from '@/theme/HDesignProvider';

import IconButton from '../IconButton/IconButton';

import {useInput} from './useInput';
import {InputProps} from './Input.type';
import {inputBoxStyle, inputStyle} from './Input.style';

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {value: propsValue, onChange, onFocus, onBlur, inputType, isError, placeholder, ...htmlProps}: InputProps,
  ref,
) {
  const {theme} = useTheme();
  useImperativeHandle(ref, () => inputRef.current!);
  const inputRef = useRef<HTMLInputElement>(null);
  const {value, handleChange, hasFocus, handleClickDelete, handleBlur, handleFocus, handleKeyDown} = useInput({
    propsValue,
    onChange,
    onBlur,
    onFocus,
    inputRef,
  });

  return (
    <div css={inputBoxStyle(theme, inputType, hasFocus, isError)}>
      <input
        css={inputStyle(theme)}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={inputRef.current === document.activeElement ? '' : placeholder}
        onKeyDown={handleKeyDown}
        {...htmlProps}
      />
      {value && hasFocus && <IconButton iconType="inputDelete" onClick={handleClickDelete} />}
    </div>
  );
});

export default Input;
