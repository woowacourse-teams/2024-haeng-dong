/** @jsxImportSource @emotion/react */

import {forwardRef, useImperativeHandle, useRef} from 'react';

import Text from '@components/Text/Text';
import {useTheme} from '@theme/HDesignProvider';

import Input from '../Input/Input';
import Flex from '../Flex/Flex';

import {errorTextStyle, labelTextStyle} from './LabelInput.style';
import {useLabelInput} from './useLabelInput';
import {LabelInputProps} from './LabelInput.type';

const LabelInput: React.FC<LabelInputProps> = forwardRef<HTMLInputElement, LabelInputProps>(function LabelInput(
  {labelText, errorText, isError, ...htmlProps}: LabelInputProps,
  ref,
) {
  useImperativeHandle(ref, () => inputRef.current!);

  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {hasFocus} = useLabelInput({inputRef});

  return (
    <Flex flexDirection="column" gap="0.375rem">
      <Flex justifyContent="spaceBetween" paddingInline="0.5rem" margin="0 0 0.375rem 0">
        <Text size="caption" css={labelTextStyle(theme)}>
          {(hasFocus || htmlProps.value) && labelText}
        </Text>
        <Text size="caption" css={errorTextStyle(theme)}>
          {isError && errorText}
        </Text>
      </Flex>
      <Flex flexDirection="column" gap="0.5rem">
        <Input ref={inputRef} isError={isError} placeholder={labelText} {...htmlProps} />
      </Flex>
    </Flex>
  );
});

export default LabelInput;
