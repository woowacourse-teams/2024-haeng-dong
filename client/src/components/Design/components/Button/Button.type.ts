import {Theme} from '@theme/theme.type';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'loading';

export interface ButtonStyleProps {
  variants?: ButtonVariants;
  size?: ButtonSize;
  theme?: Theme;
  isFull?: boolean;
}

export interface ButtonCustomProps {}

export type ButtonOptionProps = ButtonStyleProps & ButtonCustomProps;

export type ButtonProps = React.ComponentProps<'button'> & ButtonOptionProps;
