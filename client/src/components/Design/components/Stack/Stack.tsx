/** @jsxImportSource @emotion/react */
import React, {forwardRef} from 'react';

import {stackStyle} from './Stack.style';
import {StackProps} from './Stack.type';

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    children,
    gap = 0,
    direction = 'column',
    justify = 'center',
    align = 'center',
    w = 'auto',
    h = 'auto',
    p,
    m,
    br,
    b,
    bg,
    divider,
    ...props
  },
  ref,
) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div css={stackStyle({gap, direction, justify, align, p, m, br, b, bg, w, h})} ref={ref} {...props}>
      {childrenArray.map((child, index) => {
        const key = React.isValidElement(child) ? child.key || index : index;
        return (
          <>
            <React.Fragment key={key}>{child}</React.Fragment>
            {index !== childrenArray.length - 1 && divider}
          </>
        );
      })}
    </div>
  );
});

export default Stack;
