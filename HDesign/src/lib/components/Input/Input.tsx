/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {InputProps} from './Input.type';
import {useTheme} from '../../theme/HDesignProvider';
import {inputBoxStyle, inputStyle} from './Input.style';
import {useInput} from './useInput';
import IconButton from '../IconButton/IconButton';

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
