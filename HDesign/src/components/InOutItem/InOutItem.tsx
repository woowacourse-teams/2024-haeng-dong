/** @jsxImportSource @emotion/react */
import React from 'react';

import {useTheme} from '@theme/HDesignProvider';

import {InOutItemProps} from './InOutItem.type';
import {prefixStyle, textStyle} from './InOutItem.style';
import Text from '@components/Text/Text';
import IconButton from '../IconButton/IconButton';
import DragHandleItem from '../DragHandleItem/DragHandleItem';

export const InOutItem: React.FC<InOutItemProps> = ({
  names = [],
  inOutType = 'out',
  hasDragHandle = false,
  ...htmlProps
}: InOutItemProps) => {
  const {theme} = useTheme();

  // TODO: (@toari) : 사람 수 많을 때 UX writing 처리
  return (
    <DragHandleItem {...htmlProps} hasDragHandle={hasDragHandle}>
      <Text css={textStyle(theme)} size="captionBold">
        {names.join(', ')} {inOutType === 'out' ? '나감' : '들어옴'}
      </Text>
    </DragHandleItem>
  );
};
export default InOutItem;
