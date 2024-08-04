/** @jsxImportSource @emotion/react */

import Text from '@components/Text/Text';
import {useTheme} from '@/theme/HDesignProvider';

import Flex from '../Flex/Flex';

import {LabelGroupInputProps} from './LabelGroupInput.type';
import {errorTextStyle, labelTextStyle} from './LabelGroupInput.style';
import Element from './Element';
import {GroupInputProvider, useGroupInputContext} from './GroupInputContext';

const LabelGroupInput: React.FC<LabelGroupInputProps> = ({labelText, errorText, children}: LabelGroupInputProps) => {
  const {theme} = useTheme();
  const {hasAnyFocus, values, hasAnyErrors} = useGroupInputContext();

  return (
    <Flex flexDirection="column" gap="0.375rem">
      <Flex justifyContent="spaceBetween" paddingInline="0.5rem" margin="0 0 0.375rem 0">
        <Text size="caption" css={labelTextStyle(theme)}>
          {(hasAnyFocus || !Object.values(values).every(value => value === '')) && labelText}
        </Text>
        {errorText && (
          <Text size="caption" css={errorTextStyle(theme)}>
            {!Object.values(hasAnyErrors).every(error => !error) && errorText}
          </Text>
        )}
      </Flex>
      <Flex flexDirection="column" gap="0.5rem">
        {children}
      </Flex>
    </Flex>
  );
};

const LabelGroupInputContainer = (props: LabelGroupInputProps) => (
  <GroupInputProvider>
    <LabelGroupInput {...props} />
  </GroupInputProvider>
);

LabelGroupInputContainer.Element = Element;

export default LabelGroupInputContainer;
