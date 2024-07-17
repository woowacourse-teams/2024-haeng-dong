import {ComponentPropsWithoutRef} from 'react';

import {ButtonVariants} from '@components/Button/Button.type';

import {Theme} from '@theme/theme.type';

export interface BottomSheetStyleProps {
  theme?: Theme;
}

export interface BottomSheetCustomProps {
  isOpened?: boolean;
  onChangeOpen?: () => void;
  onChangeClose?: () => void;
  fixedButtonVariants?: ButtonVariants;
  fixedButtonText?: string;
}

export type BottomSheetOptionProps = BottomSheetStyleProps & BottomSheetCustomProps;

export type BottomSheetProps = ComponentPropsWithoutRef<'div'> & BottomSheetOptionProps;
