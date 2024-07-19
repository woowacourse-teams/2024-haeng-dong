export type FlexDirectionType = 'row' | 'column' | 'rowReverse' | 'columnReverse';
export type FlexDirectionStrictType = 'row' | 'column' | 'row-reverse' | 'column-reverse';

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
}

export interface ExtendedFlexProps extends FlexProps {
  [key: string]: string | undefined;
}
