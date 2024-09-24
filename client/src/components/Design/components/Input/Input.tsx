/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import IconButton from '@HDcomponents/IconButton/IconButton';
import {InputProps} from '@HDcomponents/Input/Input.type';
import {inputBoxStyle, inputStyle} from '@HDcomponents/Input/Input.style';
import {useInput} from '@HDcomponents/Input/useInput';
import Icon from '@HDcomponents/Icon/Icon';
import {useTheme} from '@theme/HDesignProvider';

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    value: propsValue,
    onChange,
    onFocus,
    onBlur,
    inputType,
    isError,
    placeholder,
    autoFocus,
    isAlwaysOnBorder = false,
    ...htmlProps
  }: InputProps,
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
    <div css={inputBoxStyle(theme, inputType, hasFocus, isError, isAlwaysOnBorder)}>
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
