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
  notEditingContainerStyle,
  notEditingTextStyle,
  underlineStyle,
} from './EditableItem.Input.style';
import {InputProps} from './EditableItem.Input.type';

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
  const shadowRef = useRef<HTMLDivElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [width, setWidth] = useState(
    value
      ? calculateTextWidthWithVirtualElement(String(value))
      : calculateTextWidthWithVirtualElement(htmlProps.placeholder || ' '),
  );

  const handleDivClick = () => {
    if (!readOnly) {
      setHasFocus(true);
    }
  };

  useEffect(() => {
    if (shadowRef.current && inputRef.current) {
      // 보이지는 않지만 존재하며 value가 담겨있는 Shadow div의 크기를 기준으로 input의 너비를 설정
      setWidth(`${shadowRef.current.offsetWidth}px`);
      inputRef.current.style.width = `${shadowRef.current.offsetWidth}px`;
    }
  }, [value]);

  return (
    <div css={inputWrapperStyle}>
      {hasFocus && !readOnly ? (
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
                  width,
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
      ) : (
        <div onClick={handleDivClick} ref={inputRef} css={notEditingContainerStyle}>
          <Flex flexDirection="row">
            {isFixed && <div css={isFixedIconStyle({theme})}>*</div>}

            <Text textColor={value === '' ? 'darkGray' : 'black'} css={notEditingTextStyle} size={textSize}>
              {value || htmlProps.placeholder}
            </Text>
          </Flex>
        </div>
      )}
    </div>
  );
});

export default EditableItemInput;
