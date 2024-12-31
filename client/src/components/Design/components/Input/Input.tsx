/** @jsxImportSource @emotion/react */
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import IconButton from '@HDcomponents/IconButton/IconButton';
import {InputProps} from '@HDcomponents/Input/Input.type';
import {useTheme} from '@theme/HDesignProvider';

import Flex from '../Flex/Flex';
import Text from '../Text/Text';

import {inputBoxStyle, inputStyle, labelTextStyle, errorTextStyle} from './Input.style';
import {IconXCircle} from '../Icons/Icons/IconXCircle';
import {IconSearch} from '../Icons/Icons/IconSearch';

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    value,
    onChange,
    onDelete,
    placeholder,
    autoFocus = false,
    labelText,
    errorText = '',
    inputType = 'input',
    isError,
    ...htmlProps
  }: InputProps,
  ref,
) {
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(autoFocus);
  const hasValue = !!value;

  useImperativeHandle(ref, () => inputRef.current!);

  useEffect(() => {
    inputRef.current?.addEventListener('focus', () => setHasFocus(true));
    inputRef.current?.addEventListener('blur', () => setHasFocus(false));
    return () => {
      inputRef.current?.removeEventListener('focus', () => setHasFocus(true));
      inputRef.current?.removeEventListener('blur', () => setHasFocus(false));
    };
  }, []);

  return (
    <Flex flexDirection="column" gap="0.375rem" cssProp={{width: '100%'}}>
      {(labelText || errorText) && (
        <Flex justifyContent="spaceBetween" paddingInline="0.5rem" margin="0 0 0.375rem 0">
          {labelText && (
            <Text size="caption" css={labelTextStyle(theme, hasFocus, hasValue)}>
              {labelText}
            </Text>
          )}
          {errorText && (
            <Text size="caption" css={errorTextStyle(theme, isError ?? false)}>
              {errorText}
            </Text>
          )}
        </Flex>
      )}
      <Flex flexDirection="column" gap="0.5rem">
        <div css={inputBoxStyle(theme, hasFocus, isError)}>
          <input
            css={inputStyle(theme)}
            ref={inputRef}
            value={value}
            onChange={onChange}
            placeholder={value ? '' : placeholder}
            autoFocus={autoFocus}
            {...htmlProps}
          />
          {onDelete && value && hasFocus && (
            <IconButton tabIndex={-1} variants="none" onMouseDown={onDelete} aria-label="입력 내용 모두 지우기">
              <IconXCircle />
            </IconButton>
          )}
          {inputType === 'search' && (
            <IconButton tabIndex={-1} variants="none" aria-label="검색">
              <IconSearch />
            </IconButton>
          )}
        </div>
      </Flex>
    </Flex>
  );
});

export default Input;
