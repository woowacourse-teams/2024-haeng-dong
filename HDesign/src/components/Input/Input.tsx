/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import IconButton from '@components/IconButton/IconButton';
import {InputProps} from '@components/Input/Input.type';
import {inputBoxStyle, inputStyle} from '@components/Input/Input.style';
import {useInput} from '@components/Input/useInput';

import {useTheme} from '@theme/HDesignProvider';

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {value: propsValue, onChange, ...htmlProps}: InputProps,
  ref,
) {
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  const {value, handleChange, handleClickDelete} = useInput({propsValue, onChange, inputRef});

  return (
    <div css={inputBoxStyle(theme)}>
      <input css={inputStyle(theme)} ref={inputRef} value={value} onChange={handleChange} {...htmlProps} />
      {value && <IconButton iconType="inputDelete" onClick={handleClickDelete} />}
    </div>
  );
});

export default Input;
