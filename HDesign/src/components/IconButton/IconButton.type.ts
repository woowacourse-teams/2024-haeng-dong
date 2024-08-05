import {Theme} from '@theme/theme.type';

export type IconButtonSize = 'large' | 'medium' | 'small';
export type IconButtonVariants = 'none' | 'primary' | 'secondary' | 'tertiary' | 'destructive';

export interface IconButtonStyleProps {
  size: IconButtonSize;
  variants: IconButtonVariants;
  theme?: Theme;
}

export interface IconButtonCustomProps {}

export type IconButtonOptionProps = IconButtonStyleProps & IconButtonCustomProps;

export type IconButtonProps = React.ComponentProps<'button'> & IconButtonOptionProps;
