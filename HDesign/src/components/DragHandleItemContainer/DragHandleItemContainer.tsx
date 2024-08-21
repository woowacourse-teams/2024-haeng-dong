/** @jsxImportSource @emotion/react */
import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {containerStyle, topRightTextStyle} from './DragHandleItemContainer.style';
import {DragHandleItemContainerProps} from './DragHandleItemContainer.type';

export const DragHandleItemContainer: React.FC<DragHandleItemContainerProps> = ({
  topLeftText,
  bottomLeftText,
  topRightText,
  bottomRightText,
  onTopLeftTextClick,
  onBottomLeftTextClick,
  onTopRightTextClick,
  onBottomRightTextClick,
  backgroundColor = 'white',
  children,
  ...htmlProps
}: DragHandleItemContainerProps) => {
  const {theme} = useTheme();

  return (
    <div css={containerStyle(theme, backgroundColor)} {...htmlProps}>
      <Flex justifyContent="spaceBetween" paddingInline="1rem">
        <Text textColor="gray" size="captionBold" onClick={onTopLeftTextClick}>
          {topLeftText}
        </Text>
        <Text textColor="gray" size="caption" onClick={onTopRightTextClick} css={topRightTextStyle(theme)}>
          {topRightText}
        </Text>
      </Flex>
      {children}
      <Flex justifyContent="spaceBetween" paddingInline="1rem">
        <Text textColor="gray" size="captionBold" onClick={onBottomLeftTextClick}>
          {bottomLeftText}
        </Text>
        <Text textColor="gray" size="caption" onClick={onBottomRightTextClick}>
          {bottomRightText}
        </Text>
      </Flex>
    </div>
  );
};
export default DragHandleItemContainer;
