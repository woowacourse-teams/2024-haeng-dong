/** @jsxImportSource @emotion/react */
import Icon from '@HDcomponents/Icon/Icon';
import Flex from '@HDcomponents/Flex/Flex';
import Text from '@HDcomponents/Text/Text';
import IsFixedIcon from '@HDcomponents/IsFixedIcon/IsFixedIcon';
import {useTheme} from '@theme/HDesignProvider';

import IconButton from '../IconButton/IconButton';

import {dragHandleItemStyle, dragHandlerStyle} from './DragHandleItem.style';
import {DragHandleItemProps} from './DragHandleItem.type';

export const DragHandleItem = ({
  hasDragHandler = false,
  backgroundColor = 'white',
  isFixed = false,
  prefix,
  suffix,
  ...htmlProps
}: DragHandleItemProps) => {
  const {theme} = useTheme();

  // TODO: (@toari) : 사람 수 많을 때 UX writing 처리
  return (
    <div css={dragHandleItemStyle(theme, hasDragHandler, backgroundColor)} {...htmlProps}>
      <div css={dragHandlerStyle}>
        {hasDragHandler && (
          <IconButton variants="none">
            <Icon iconType="buljusa" />
          </IconButton>
        )}
        <Flex justifyContent="spaceBetween" width="100%">
          <Text size="bodyBold">{prefix}</Text>
          <Flex flexDirection="row">
            {isFixed && <IsFixedIcon />}
            <Text>{suffix}</Text>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};
export default DragHandleItem;
