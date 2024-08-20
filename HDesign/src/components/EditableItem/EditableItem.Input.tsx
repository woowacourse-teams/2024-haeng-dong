/** @jsxImportSource @emotion/react */
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import Flex from '@components/Flex/Flex';
import Text from '@components/Text/Text';

import {useTheme} from '@theme/HDesignProvider';

import {
  editingContainerStyle,
  inputStyle,
  inputWrapperStyle,
  isFixedIconStyle,
  underlineStyle,
} from './EditableItem.Input.style';
import {InputProps} from './EditableItem.Input.type';
import useEditableItemInput from './useEditableItemInput';

export const EditableItemInput = forwardRef<HTMLInputElement, InputProps>(function Input(
  {isFixed = false, textSize = 'body', hasError = false, readOnly = false, ...htmlProps},
  ref,
) {
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const {hasFocus} = useEditableItemInput({inputRef});
  useImperativeHandle(ref, () => inputRef.current!);

  useEffect(() => {
    if (shadowRef.current && inputRef.current) {
      inputRef.current.style.width = `${shadowRef.current.offsetWidth}px`;
    }
  }, [htmlProps.value]);

  return (
    <div css={inputWrapperStyle}>
      <Flex flexDirection="row">
        <div ref={shadowRef} css={editingContainerStyle}>
          <Text size={textSize}>{htmlProps.value || htmlProps.placeholder}</Text>
        </div>
        {isFixed && <div css={isFixedIconStyle({theme})}>*</div>}
        <div css={underlineStyle({theme, hasError, hasFocus})}>
          <input
            css={inputStyle({
              theme,
              textSize,
            })}
            ref={inputRef}
            autoFocus
            readOnly={readOnly}
            disabled={readOnly}
            {...htmlProps}
            placeholder={htmlProps.placeholder}
          />
        </div>
      </Flex>
    </div>
  );
});

export default EditableItemInput;
