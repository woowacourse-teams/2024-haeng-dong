/** @jsxImportSource @emotion/react */

import Text from '@components/Text/Text';
import {useTheme} from '@/theme/HDesignProvider';

import {LabelInputProps} from './LabelInput.type';
import {errorTextStyle, labelGroupStyle, labelTextStyle} from './LabelInput.style';

const LabelInput = ({labelText, errorText, children}: LabelInputProps) => {
  const {theme} = useTheme();
  return (
    <>
      <div css={labelGroupStyle}>
        <label>
          <Text size="caption" css={labelTextStyle(theme)}>
            {labelText}
          </Text>
        </label>
        {errorText && (
          <Text size="caption" css={errorTextStyle(theme)}>
            {errorText}
          </Text>
        )}
      </div>
      {children}
    </>
  );
};

export default LabelInput;
