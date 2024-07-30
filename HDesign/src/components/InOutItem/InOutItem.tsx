/** @jsxImportSource @emotion/react */
import React from 'react';

import Text from '@components/Text/Text';

import {useTheme} from '@theme/HDesignProvider';

import DragHandleItem from '../DragHandleItem/DragHandleItem';

import {InOutItemProps, InOutType} from './InOutItem.type';
import {textStyle} from './InOutItem.style';

const IN_OUT_TEXT: Record<InOutType, string> = {
  IN: '들어옴',
  OUT: '나감',
};

export const InOutItem: React.FC<InOutItemProps> = ({
  names = [],
  inOutType = 'OUT',
  hasDragHandle = false,
  ...htmlProps
}: InOutItemProps) => {
  const {theme} = useTheme();

  // TODO: (@toari) : 사람 수 많을 때 UX writing 처리
  return (
    <DragHandleItem {...htmlProps} hasDragHandle={hasDragHandle}>
      <Text css={textStyle(theme, hasDragHandle)} size="bodyBold">
        {names.join(', ')} {IN_OUT_TEXT[inOutType]}
      </Text>
    </DragHandleItem>
  );
};
export default InOutItem;
