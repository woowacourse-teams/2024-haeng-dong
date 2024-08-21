import {ButtonVariants} from '@components/Button/Button.type';

import {Theme} from '@theme/theme.type';

export interface FixedButtonStyleProps {
  variants?: ButtonVariants;
  theme?: Theme;
}

export interface ButtonCustomProps {
  onDeleteClick?: () => void;
}

export type FixedButtonOptionProps = FixedButtonStyleProps & ButtonCustomProps;

export type FixedButtonProps = React.ComponentProps<'button'> & FixedButtonOptionProps;
