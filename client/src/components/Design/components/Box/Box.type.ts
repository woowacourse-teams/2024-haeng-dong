import {CSSProperties} from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  w?: CSSProperties['width'];
  h?: CSSProperties['height'];
  z?: CSSProperties['zIndex'];
  p?: CSSProperties['padding'];
  m?: CSSProperties['margin'];
  br?: CSSProperties['borderRadius'];
  b?: CSSProperties['border'];
  bg?: CSSProperties['background'];
  fixed?: boolean;
  center?: boolean;
}
