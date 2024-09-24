import {Theme} from '../../theme/theme.type';

export type FlexDirectionType = 'row' | 'column' | 'rowReverse' | 'columnReverse';
export type FlexDirectionStrictType = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexBackgroundColor = 'gray' | 'white' | 'lightGray';

export interface FlexProps {
  justifyContent?: 'flexStart' | 'center' | 'flexEnd' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  alignItems?: 'flexStart' | 'center' | 'flexEnd' | 'stretch' | 'baseline';
  flexDirection?: FlexDirectionType;
  gap?: string;
  padding?: string;
  paddingInline?: string;
  margin?: string;
  width?: string;
  height?: string;
  backgroundColor?: FlexBackgroundColor;
  theme?: Theme;
  minHeight?: string;

  otherStyle?: React.CSSProperties;
}
