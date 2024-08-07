import {ColorKeys} from '@token/colors';

export type IconType = 'inputDelete' | 'buljusa' | 'rightChevron' | 'search' | 'error' | 'confirm' | 'trash';
export type IconColor = ColorKeys;

export interface IconStyleProps {
  iconColor?: IconColor;
}

export interface IconCustomProps {
  iconType: IconType;
}

export type IconOptionProps = IconStyleProps & IconCustomProps;

export type IconProps = React.ComponentProps<'div'> & IconOptionProps;
