import {ColorKeys} from '@token/colors';

export type IconColor = ColorKeys;
export interface SvgProps extends React.ComponentProps<'svg'> {
  color?: IconColor;
  height?: number;
  width?: number;
  size?: number;
  isUsingFill?: boolean;
  viewBox?: string;
}
