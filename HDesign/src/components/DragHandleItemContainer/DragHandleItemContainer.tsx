/** @jsxImportSource @emotion/react */
import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {containerStyle} from './DragHandleItemContainer.style';
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
        <Text color="gray" size="captionBold">
          {topLeftText}
        </Text>
        <Text color="gray" size="caption">
          {topRightText}
        </Text>
      </Flex>
      {children}
      <Flex justifyContent="spaceBetween" paddingInline="0.5rem">
        <Text color="gray" size="captionBold">
          {bottomLeftText}
        </Text>
        <Text color="gray" size="caption">
          {bottomRightText}
        </Text>
      </Flex>
    </div>
  );
};
export default DragHandleItemContainer;
