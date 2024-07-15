import {Theme} from 'lib/theme/theme.type';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariants = 'primary' | 'secondary' | 'tertiary';

export interface ButtonStyleProps {
  variants?: ButtonVariants;
  size?: ButtonSize;
  theme?: Theme;
}

export interface ButtonCustomProps {}

export type ButtonOptionProps = ButtonStyleProps & ButtonCustomProps;

export type ButtonProps = React.ComponentProps<'button'> & ButtonOptionProps;
