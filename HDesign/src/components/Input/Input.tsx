/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import IconButton from '@components/IconButton/IconButton';
import {InputProps} from '@components/Input/Input.type';
import {inputBoxStyle, inputStyle} from '@components/Input/Input.style';
import {useInput} from '@components/Input/useInput';
import Icon from '@components/Icon/Icon';

import {useTheme} from '@theme/HDesignProvider';

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {value: propsValue, onChange, onFocus, onBlur, inputType, isError, placeholder, autoFocus, ...htmlProps}: InputProps,
  ref,
) {
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
  useImperativeHandle(ref, () => inputRef.current!);

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
      {value && hasFocus && (
        <IconButton tabIndex={-1} variants="none" onMouseDown={handleClickDelete}>
          <Icon iconType="inputDelete" />
        </IconButton>
      )}
    </div>
  );
});

export default Input;
