import {CSSProperties} from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  w?: CSSProperties['width'];
  h?: CSSProperties['height'];
  p?: CSSProperties['padding'];
  m?: CSSProperties['margin'];
  br?: CSSProperties['borderRadius'];
  b?: CSSProperties['border'];
  bg?: CSSProperties['background'];
  center?: boolean;
}
