/** @jsxImportSource @emotion/react */

import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import Text from '@components/Text/Text';
import {useTheme} from '@/theme/HDesignProvider';

import Input from '../Input/Input';

import {LabelInputProps} from './LabelInput.type';
import {errorTextStyle, inputGroupStyle, labelGroupStyle, labelInputStyle, labelTextStyle} from './LabelInput.style';
import {useLabelInput} from './useLabelInput';

const LabelInput: React.FC<LabelInputProps> = forwardRef<HTMLInputElement, LabelInputProps>(function LabelInput(
  {labelText, errorText, isError, ...htmlProps}: LabelInputProps,
  ref,
) {
  useImperativeHandle(ref, () => inputRef.current!);
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {hasFocus} = useLabelInput({inputRef});

  return (
    <div css={labelInputStyle}>
      <div css={labelGroupStyle}>
        <label>
          <Text size="caption" css={labelTextStyle(theme)}>
            {(hasFocus || htmlProps.value) && labelText}
          </Text>
        </label>

        <Text size="caption" css={errorTextStyle(theme)}>
          {isError && errorText}
        </Text>
      </div>
      <div css={inputGroupStyle}>
        <Input ref={inputRef} isError={isError} placeholder={labelText} {...htmlProps} />
      </div>
    </div>
  );
});

export default LabelInput;
