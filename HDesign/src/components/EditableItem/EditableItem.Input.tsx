/** @jsxImportSource @emotion/react */
import {forwardRef, useEffect, useRef, useState} from 'react';

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

export const EditableItemInput = forwardRef<HTMLInputElement, InputProps>(function Input(
  {isFixed = false, textSize = 'body', value = '', hasError = false, readOnly = false, ...htmlProps},
  ref,
) {
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (shadowRef.current && inputRef.current) {
      // 보이지는 않지만 존재하며 value가 담겨있는 Shadow div의 크기를 기준으로 input의 너비를 설정
      inputRef.current.style.width = `${shadowRef.current.offsetWidth}px`;
    }
  }, [value]);

  return (
    <div css={inputWrapperStyle}>
      <Flex flexDirection="row">
        <div ref={shadowRef} css={editingContainerStyle}>
          <Text size={textSize}>{value || htmlProps.placeholder}</Text>
        </div>
        {isFixed && <div css={isFixedIconStyle({theme})}>*</div>}
        <div css={underlineStyle({theme, hasError, hasFocus})}>
          <input
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            css={[
              inputStyle({
                theme,
                textSize,
                width: `${shadowRef.current?.offsetWidth}px`,
              }),
            ]}
            ref={inputRef}
            autoFocus
            readOnly={readOnly}
            disabled={readOnly}
            {...htmlProps}
            placeholder={htmlProps.placeholder}
            value={value}
          />
        </div>
      </Flex>
    </div>
  );
});

export default EditableItemInput;
