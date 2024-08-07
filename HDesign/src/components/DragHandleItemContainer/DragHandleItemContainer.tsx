/** @jsxImportSource @emotion/react */
import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {
  bottomLeftTextStyle,
  bottomRightTextStyle,
  containerStyle,
  topLeftStyle,
  topRightStyle,
} from './DragHandleItemContainer.style';
import {DragHandleItemContainerProps} from './DragHandleItemContainer.type';

export const DragHandleItemContainer: React.FC<DragHandleItemContainerProps> = ({
  topLeftText,
  bottomLeftText,
  topRightText,
  bottomRightText,
  backgroundColor = 'white',
  children,
  ...htmlProps
}: DragHandleItemContainerProps) => {
  const {theme} = useTheme();

  return (
    <div css={containerStyle(theme, backgroundColor)} {...htmlProps}>
      <Flex justifyContent="spaceBetween" paddingInline="0.5rem">
        <Text css={topLeftStyle(theme)} size="captionBold">
          {topLeftText}
        </Text>
        <Text css={topRightStyle(theme)} size="caption">
          {topRightText}
        </Text>
      </Flex>
      {children}
      <Flex justifyContent="spaceBetween" paddingInline="0.5rem">
        <Text css={bottomLeftTextStyle(theme)} size="captionBold">
          {bottomLeftText}
        </Text>
        <Text css={bottomRightTextStyle(theme)} size="caption">
          {bottomRightText}
        </Text>
      </Flex>
    </div>
  );
};
export default DragHandleItemContainer;
