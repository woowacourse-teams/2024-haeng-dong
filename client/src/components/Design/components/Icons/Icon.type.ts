import {Theme} from '@theme/theme.type';
import {ColorKeys} from '@token/colors';

import {ICON} from './Icon';

export type IconType = keyof typeof ICON;

export type IconColor = ColorKeys;

export interface IconStyleProps {
  iconColor?: IconColor;
  iconType: IconType;
  size?: number;
  width?: number;
  height?: number;
}

export interface IconStylePropsWithTheme extends IconStyleProps {
  theme: Theme;
}

export type IconOptionProps = IconStyleProps;

export type IconProps = React.ComponentProps<'div'> & IconOptionProps;

export interface SvgProps {
  children: React.ReactNode;
  color?: IconColor;
  height?: number;
  width?: number;
  size?: number;
  isUsingFill?: boolean;
  viewBox?: string;
}
