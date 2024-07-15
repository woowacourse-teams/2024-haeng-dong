import {Theme} from 'lib/theme/theme.type';
import {ComponentPropsWithoutRef} from 'react';
import {ButtonVariants} from '../Button/Button.type';

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
