/** @jsxImportSource @emotion/react */
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import {InputProps} from '@components/EditableItem/EditableItem.Input.type';

import {useTheme} from '@theme/HDesignProvider';
import {inputStyle, inputWrapperStyle} from './EditableItem.Input.style';
import useEditableItemInput from './useEditableItemInput';

export const EditableItemInput: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {textSize = 'body', hasError = false, ...htmlProps},
  ref,
) {
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {hasFocus} = useEditableItemInput({inputRef});
  useImperativeHandle(ref, () => inputRef.current!);

  return (
    <div css={inputWrapperStyle({theme, hasFocus, hasError})}>
      <input css={inputStyle({theme, textSize})} ref={inputRef} {...htmlProps} />
    </div>
  );
});

export default EditableItemInput;
