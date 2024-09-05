import {ComponentPropsWithoutRef} from 'react';

import {Theme} from '@theme/theme.type';

export interface BottomSheetStyleProps {
  theme?: Theme;
}

export interface BottomSheetCustomProps {
  isOpened?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export type BottomSheetOptionProps = BottomSheetStyleProps & BottomSheetCustomProps;

export type BottomSheetProps = ComponentPropsWithoutRef<'div'> & BottomSheetOptionProps;
