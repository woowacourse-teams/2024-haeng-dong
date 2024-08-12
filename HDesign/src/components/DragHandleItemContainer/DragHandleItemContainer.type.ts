import {ColorKeys} from '@token/colors';

export interface DragHandleItemContainerStyleProps {
  backgroundColor?: ColorKeys;
}

export interface DragHandleItemContainerCustomProps {
  topLeftText?: string;
  onTopLeftTextClick?: () => void;
  bottomLeftText?: string;
  onBottomLeftTextClick?: () => void;
  topRightText?: string;
  onTopRightTextClick?: () => void;
  bottomRightText?: string;
  onBottomRightTextClick?: () => void;
}

export type DragHandleItemContainerOptionProps = DragHandleItemContainerStyleProps & DragHandleItemContainerCustomProps;

export type DragHandleItemContainerProps = React.ComponentProps<'div'> & DragHandleItemContainerOptionProps;
