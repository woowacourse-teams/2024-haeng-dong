import {Theme} from '@theme/theme.type';
import {ColorKeys} from '@token/colors';

export interface DragHandleItemStyleProps {
  theme?: Theme;
  backgroundColor?: ColorKeys;
}

export interface DragHandleItemCustomProps {
  hasDragHandler?: boolean;
  prefix?: string;
  suffix?: string;
  isFixed?: boolean;
}

export type DragHandleItemOptionProps = DragHandleItemStyleProps & DragHandleItemCustomProps;

export type DragHandleItemProps = React.ComponentProps<'div'> & DragHandleItemOptionProps;
