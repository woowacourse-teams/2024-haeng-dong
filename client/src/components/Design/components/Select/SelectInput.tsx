/** @jsxImportSource @emotion/react */
import {useState} from 'react';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import IconButton from '../IconButton/IconButton';
import Chevron from '../Chevron/Chevron';

import {SelectInputProps} from './Select.type';
import {inputBoxStyle, inputStyle, labelTextStyle} from './SelectInput.style';

const SelectInput = ({
  labelText,
  placeholder,
  value,
  hasFocus = false,
  setHasFocus,
  onChange,
  ...inputProps
}: SelectInputProps) => {
  const {theme} = useTheme();
  const hasValue = !!value;

  const onFocusChange = () => {
    if (setHasFocus) setHasFocus(prev => !prev);
  };

  return (
    <Flex flexDirection="column" gap="0.375rem">
      {labelText && (
        <Flex justifyContent="spaceBetween" paddingInline="0.5rem" margin="0 0 0.375rem 0">
          {labelText && (
            <Text size="caption" css={labelTextStyle(theme, hasFocus, hasValue)}>
              {labelText}
            </Text>
          )}
        </Flex>
      )}
      <Flex flexDirection="column" gap="0.5rem" onClick={onFocusChange}>
        <div css={inputBoxStyle(theme, hasFocus)}>
          <input
            css={inputStyle(theme)}
            value={value}
            onChange={onChange}
            placeholder={value ? '' : placeholder}
            {...inputProps}
          />
          <IconButton variants="none">
            <Chevron isActive={hasFocus} />
          </IconButton>
        </div>
      </Flex>
    </Flex>
  );
};

export default SelectInput;
