import {ComponentPropsWithoutRef} from 'react';

import {ButtonVariants} from '@components/Button/Button.type';

import {Theme} from '@theme/theme.type';

import {FixedButtonProps} from '../FixedButton/FixedButton.type';

export interface BottomSheetStyleProps {
  theme?: Theme;
}

export interface BottomSheetCustomProps {
  isOpened?: boolean;
  onChangeOpen?: () => void;
  onChangeClose?: () => void;
}

export type BottomSheetOptionProps = BottomSheetStyleProps & BottomSheetCustomProps;

export type BottomSheetProps = ComponentPropsWithoutRef<'div'> & BottomSheetOptionProps;
