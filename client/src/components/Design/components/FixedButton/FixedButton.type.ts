import {ButtonVariants} from '@HDcomponents/Button/Button.type';
import {Theme} from '@theme/theme.type';

export interface FixedButtonStyleProps {
  variants?: ButtonVariants;
  theme?: Theme;
}

export interface ButtonCustomProps {
  onDeleteClick?: () => void;
  onBackClick?: () => void;
}

export type FixedButtonOptionProps = FixedButtonStyleProps & ButtonCustomProps;

export type FixedButtonProps = React.ComponentProps<'button'> & FixedButtonOptionProps;
