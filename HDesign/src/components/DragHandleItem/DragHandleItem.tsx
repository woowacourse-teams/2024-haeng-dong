/** @jsxImportSource @emotion/react */
import React from 'react';

import {StrictPropsWithChildren} from '@type/strictPropsWithChildren';
import {COLORS, ColorKeys} from '@token/colors';

import {useTheme} from '@theme/HDesignProvider';

import IconButton from '../IconButton/IconButton';

import {dragHandleItemStyle, prefixStyle} from './DragHandleItem.style';

interface DragHandleItemCustomProps {
  hasDragHandle?: boolean;
  backgroundColor?: ColorKeys;
}

export type DragHandleItemProps = React.ComponentProps<'div'> & DragHandleItemCustomProps;

export function DragHandleItem({
  hasDragHandle = false,
  backgroundColor = 'white',
  children,
  ...htmlProps
}: StrictPropsWithChildren<DragHandleItemProps>) {
  const {theme} = useTheme();

  // TODO: (@toari) : 사람 수 많을 때 UX writing 처리
  return (
    <div css={dragHandleItemStyle(theme, hasDragHandle, backgroundColor)} {...htmlProps}>
      <div css={prefixStyle}>
        {hasDragHandle && <IconButton iconType="buljusa" />}
        {children}
      </div>
    </div>
  );
}
export default DragHandleItem;
