/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import IconButton from '@components/IconButton/IconButton';
import {InputProps} from '@components/Input/Input.type';
import {inputBoxStyle, inputStyle} from '@components/Input/Input.style';
import {useInput} from '@components/Input/useInput';

import {useTheme} from '@theme/HDesignProvider';

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {value: propsValue, onChange, onFocus, onBlur, inputType, isError, placeholder, autoFocus, ...htmlProps}: InputProps,
  ref,
) {
  useImperativeHandle(ref, () => inputRef.current!);
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {value, handleChange, hasFocus, handleClickDelete, handleBlur, handleFocus, handleKeyDown} = useInput({
    propsValue,
    onChange,
    onBlur,
    onFocus,
    inputRef,
    autoFocus,
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
        placeholder={value ? '' : placeholder}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        {...htmlProps}
      />
      {value && hasFocus && <IconButton tabIndex={-1} iconType="inputDelete" onMouseDown={handleClickDelete} />}
    </div>
  );
});

export default Input;
