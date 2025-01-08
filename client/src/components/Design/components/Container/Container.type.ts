import {CSSProperties, HTMLAttributes} from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxW?: CSSProperties['maxWidth'];
  p?: CSSProperties['padding'];
  m?: CSSProperties['margin'];
  br?: CSSProperties['borderRadius'];
  b?: CSSProperties['border'];
  bg?: CSSProperties['background'];
  center?: boolean;
}
