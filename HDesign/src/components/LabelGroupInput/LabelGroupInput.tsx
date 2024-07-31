/** @jsxImportSource @emotion/react */

import Text from '@components/Text/Text';
import {useTheme} from '@/theme/HDesignProvider';

import {LabelGroupInputProps} from './LabelGroupInput.type';
import {
  errorTextStyle,
  inputGroupStyle,
  labelGroupStyle,
  labelInputStyle,
  labelTextStyle,
} from './LabelGroupInput.style';
import Element from './Element';
import {GroupInputProvider, useGroupInputContext} from './GroupInputContext';

const LabelGroupInput: React.FC<LabelGroupInputProps> = ({labelText, errorText, children}: LabelGroupInputProps) => {
  const {theme} = useTheme();
  const {hasAnyFocus, values, hasErrors} = useGroupInputContext();

  return (
    <div css={labelInputStyle}>
      <div css={labelGroupStyle}>
        <label>
          <Text size="caption" css={labelTextStyle(theme)}>
            {(hasAnyFocus || !Object.values(values).every(value => value === '')) && labelText}
          </Text>
        </label>
        {errorText && (
          <Text size="caption" css={errorTextStyle(theme)}>
            {!Object.values(hasErrors).every(error => !error) && errorText}
          </Text>
        )}
      </div>
      <div css={inputGroupStyle}>{children}</div>
    </div>
  );
};

const LabelGroupInputContainer = (props: LabelGroupInputProps) => (
  <GroupInputProvider>
    <LabelGroupInput {...props} />
  </GroupInputProvider>
);

LabelGroupInputContainer.Element = Element;

export default LabelGroupInputContainer;
