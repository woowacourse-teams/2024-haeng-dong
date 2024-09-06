import {Theme} from '@theme/theme.type';
import {ColorKeys} from '@token/colors';

export type IconType = 'inputDelete' | 'buljusa' | 'rightChevron' | 'search' | 'error' | 'confirm' | 'trash';
export type IconColor = ColorKeys;

export interface IconStyleProps {
  iconColor?: IconColor;
  iconType: IconType;
}

export interface IconStylePropsWithTheme extends IconStyleProps {
  theme: Theme;
}

export interface IconCustomProps {}

export type IconOptionProps = IconStyleProps & IconCustomProps;

export type IconProps = React.ComponentProps<'div'> & IconOptionProps;
