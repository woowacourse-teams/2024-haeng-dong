/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import IconButton from '@components/IconButton/IconButton';
import {InputProps} from '@components/Input/Input.type';
import {inputBoxStyle, inputStyle} from '@components/Input/Input.style';
import {useInput} from '@components/Input/useInput';

import {useTheme} from '@theme/HDesignProvider';

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {value: propsValue, onChange, onFocus, onBlur, inputType, isError, placeholder, ...htmlProps}: InputProps,
  ref,
) {
  useImperativeHandle(ref, () => inputRef.current!);
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {value, handleChange, hasFocus, handleClickDelete} = useInput({propsValue, onChange, inputRef});

  return (
    <div css={inputBoxStyle(theme, inputType, hasFocus, isError)}>
      <input
        css={inputStyle(theme)}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder={inputRef.current === document.activeElement ? '' : placeholder}
        {...htmlProps}
      />
      {value && hasFocus && <IconButton iconType="inputDelete" onMouseDown={handleClickDelete} />}
    </div>
  );
});

export default Input;
