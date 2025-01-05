/** @jsxImportSource @emotion/react */
import React, {forwardRef} from 'react';

import {hStackStyle} from './Stack.style';
import {HStackProps} from './Stack.type';

export const HStack = forwardRef<HTMLDivElement, HStackProps>(function HStack(
  {children, gap = 0, justify = 'flex-start', divider, p, m, br, b, bg, ...props},
  ref,
) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div css={hStackStyle({gap, justify, p, m, br, b, bg})} ref={ref} {...props}>
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

export default HStack;
