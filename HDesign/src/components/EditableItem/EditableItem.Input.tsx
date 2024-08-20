/** @jsxImportSource @emotion/react */
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import {InputProps} from '@components/EditableItem/EditableItem.Input.type';

import {useTheme} from '@theme/HDesignProvider';

import {inputStyle, inputWrapperStyle} from './EditableItem.Input.style';
import useEditableItemInput from './useEditableItemInput';

// 실제 컴포넌트를 렌더링하고 그 width를 받아와 언더라인의 길이를 정확하게 표시할 수 있도록 함
const calculateTextWidthWithVirtualElement = (text: string) => {
  const element = document.createElement('div');
  element.style.position = 'absolute';
  element.style.whiteSpace = 'nowrap';
  element.style.visibility = 'hidden';
  element.textContent = text;

  document.body.appendChild(element); // 렌더링

  // 요소의 실제 너비 계산
  const width = element.offsetWidth;

  document.body.removeChild(element); // 제거

  return `${width}px`;
};

export const EditableItemInput = forwardRef<HTMLInputElement, InputProps>(function Input(
  {isFixed = false, textSize = 'body', hasError = false, value = '', readOnly = false, ...htmlProps},
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
