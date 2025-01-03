import {CSSProperties, HTMLAttributes, ReactNode} from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  p?: CSSProperties['padding'];
  m?: CSSProperties['margin'];
  br?: CSSProperties['borderRadius'];
  b?: CSSProperties['border'];
  bg?: CSSProperties['background'];
  gap?: string | number;
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  divider?: ReactNode;
}

export type HStackProps = Omit<StackProps, 'direction'>;
export type VStackProps = Omit<StackProps, 'direction'>;
