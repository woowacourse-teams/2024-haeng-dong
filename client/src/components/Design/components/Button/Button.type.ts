import {Theme} from '@theme/theme.type';

export type ButtonSize = 'small' | 'medium' | 'semiLarge' | 'large';
export type ButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'loading' | 'kakao';

export interface ButtonStyleProps {
  variants?: ButtonVariants;
  size?: ButtonSize;
  theme?: Theme;
}

export interface ButtonCustomProps {}

export type ButtonOptionProps = ButtonStyleProps & ButtonCustomProps;

export type ButtonProps = React.ComponentProps<'button'> & ButtonOptionProps;
