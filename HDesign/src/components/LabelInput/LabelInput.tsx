/** @jsxImportSource @emotion/react */

import Text from '@components/Text/Text';
import {useTheme} from '@/theme/HDesignProvider';

import {LabelInputProps} from './LabelInput.type';
import {errorTextStyle, inputGroupStyle, labelGroupStyle, labelInputStyle, labelTextStyle} from './LabelInput.style';
import Input from '../Input/Input';
import {forwardRef, useImperativeHandle, useRef} from 'react';
import {useLabelInput} from './useLabelInput';

const LabelInput: React.FC<LabelInputProps> = forwardRef<HTMLInputElement, LabelInputProps>(function LabelInput(
  {value: propsValue, onChange, labelText, errorText, isError, ...htmlProps}: LabelInputProps,
  ref,
) {
  useImperativeHandle(ref, () => inputRef.current!);
  const {theme} = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {value, handleChange, hasFocus} = useLabelInput({inputRef, propsValue, onChange});

  return (
    <div css={labelInputStyle}>
      <div css={labelGroupStyle}>
        <label>
          <Text size="caption" css={labelTextStyle(theme)}>
            {(hasFocus || value) && labelText}
          </Text>
        </label>

        <Text size="caption" css={errorTextStyle(theme)}>
          {isError && errorText}
        </Text>
      </div>
      <div css={inputGroupStyle}>
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          isError={isError}
          placeholder={labelText}
          {...htmlProps}
        />
      </div>
    </div>
  );
});

export default LabelInput;
