import {ColorKeys} from '@token/colors';

import {Theme} from '@theme/theme.type';

export interface DragHandleItemStyleProps {
  theme?: Theme;
  backgroundColor?: ColorKeys;
}

export interface DragHandleItemCustomProps {
  hasDragHandler?: boolean;
  prefix?: string;
  suffix?: string;
}

export type DragHandleItemOptionProps = DragHandleItemStyleProps & DragHandleItemCustomProps;

export type DragHandleItemProps = React.ComponentProps<'div'> & DragHandleItemOptionProps;
