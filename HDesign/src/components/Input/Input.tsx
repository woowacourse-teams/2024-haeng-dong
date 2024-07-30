/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';

import IconButton from '@components/IconButton/IconButton';
import {InputProps} from '@components/Input/Input.type';
import {inputBoxStyle, inputStyle} from '@components/Input/Input.style';
import {useInput} from '@components/Input/useInput';

import {useTheme} from '@theme/HDesignProvider';

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {value: propsValue, onChange, inputType, isError, ...htmlProps}: InputProps,
  ref,
) {
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  const {value, hasFocus, handleChange, handleClickDelete, toggleFocus} = useInput({propsValue, onChange, inputRef});

  return (
    <div css={inputBoxStyle(theme, inputType, hasFocus, isError)}>
      <input
        css={inputStyle(theme)}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        {...htmlProps}
      />
      {value && hasFocus && <IconButton iconType="inputDelete" onClick={handleClickDelete} />}
    </div>
  );
});

export default Input;
