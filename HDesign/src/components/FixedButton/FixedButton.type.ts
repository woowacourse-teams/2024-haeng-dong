import {Theme} from '@theme/theme.type';
import {ButtonVariants} from '@components/Button/Button.type';

export interface FixedButtonStyleProps {
  variants?: ButtonVariants;
  theme?: Theme;
}

export interface ButtonCustomProps {}

export type FixedButtonOptionProps = FixedButtonStyleProps;

export type FixedButtonProps = React.ComponentProps<'button'> & FixedButtonOptionProps;
