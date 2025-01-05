/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';
import {BoxProps} from './Box.type';
import {boxStyle} from './Box.style';

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  {children, w = 'auto', h = 'auto', p, m, br, b, bg, center = false, ...props},
  ref,
) {
  return (
    <div ref={ref} css={boxStyle({w, h, p, m, br, b, bg, center})} {...props}>
      {children}
    </div>
  );
});

export default Box;
