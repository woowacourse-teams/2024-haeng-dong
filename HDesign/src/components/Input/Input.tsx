/** @jsxImportSource @emotion/react */
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {useInput} from './useInput';

export type InputType = 'input' | 'search';

export interface InputCustomProps {
  inputType?: InputType;
  isError?: boolean;
}

export type InputOptionProps = InputCustomProps;

export type InputProps = React.ComponentProps<'input'> & InputOptionProps;

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {value: propsValue, onChange, onFocus, onBlur, inputType, isError, placeholder, ...htmlProps}: InputProps,
  ref,
) {
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
    <div>
      <input
        style={{backgroundColor: 'lavender'}}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={inputRef.current === document.activeElement ? '' : placeholder}
        onKeyDown={handleKeyDown}
        {...htmlProps}
      />
      {value && hasFocus && <button onMouseDown={handleClickDelete}>x버튼</button>}
    </div>
  );
});

export default Input;
