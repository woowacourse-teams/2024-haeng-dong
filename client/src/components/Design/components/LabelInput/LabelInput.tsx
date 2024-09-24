/** @jsxImportSource @emotion/react */

import {forwardRef, useImperativeHandle, useRef} from 'react';

import Text from '@HDcomponents/Text/Text';
import {useTheme} from '@theme/HDesignProvider';

import Input from '../Input/Input';
import Flex from '../Flex/Flex';

import {errorTextStyle, labelTextStyle} from './LabelInput.style';
import {useLabelInput} from './useLabelInput';
import {LabelInputProps} from './LabelInput.type';

const LabelInput: React.FC<LabelInputProps> = forwardRef<HTMLInputElement, LabelInputProps>(function LabelInput(
  {
    labelText,
    errorText,
    isError,
    isAlwaysOnLabel = false,
    isAlwaysOnInputBorder = false,
    ...htmlProps
  }: LabelInputProps,
  ref,
) {
  useImperativeHandle(ref, () => inputRef.current!);

  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {hasFocus} = useLabelInput({inputRef});

  return (
    <Flex flexDirection="column" gap="0.375rem">
      <Flex justifyContent="spaceBetween" paddingInline="0.5rem" margin="0 0 0.375rem 0">
        <Text size="caption" css={labelTextStyle(theme, hasFocus, !!htmlProps.value, isAlwaysOnLabel)}>
          {labelText}
        </Text>
        {errorText && (
          <Text size="caption" css={errorTextStyle(theme, isError ?? false)}>
            {errorText}
          </Text>
        )}
      </Flex>
      <Flex flexDirection="column" gap="0.5rem">
        <Input
          ref={inputRef}
          isError={isError}
          placeholder={labelText}
          isAlwaysOnBorder={isAlwaysOnInputBorder}
          {...htmlProps}
        />
      </Flex>
    </Flex>
  );
});

export default LabelInput;
