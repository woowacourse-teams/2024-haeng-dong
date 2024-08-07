import {ColorKeys} from '@token/colors';

export interface DragHandleItemContainerStyleProps {
  backgroundColor?: ColorKeys;
}

export interface DragHandleItemContainerCustomProps {
  topLeftText?: string;
  bottomLeftText?: string;
  topRightText?: string;
  bottomRightText?: string;
}

export type DragHandleItemContainerOptionProps = DragHandleItemContainerStyleProps & DragHandleItemContainerCustomProps;

export type DragHandleItemContainerProps = React.ComponentProps<'div'> & DragHandleItemContainerOptionProps;
