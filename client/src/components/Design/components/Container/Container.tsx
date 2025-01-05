/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {containerStyle} from './Container.style';
import {ContainerProps} from './Container.type';

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  {children, maxW, p, m, br, b, bg, center = false, ...props},
  ref,
) {
  return (
    <div css={containerStyle({maxW, p, m, br, b, bg, center})} ref={ref} {...props}>
      {children}
    </div>
  );
});

export default Container;
