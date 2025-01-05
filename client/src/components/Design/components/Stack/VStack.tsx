/** @jsxImportSource @emotion/react */
import React, {forwardRef} from 'react';

import {vStackStyle} from './Stack.style';
import {VStackProps} from './Stack.type';

export const VStack = forwardRef<HTMLDivElement, VStackProps>(function VStack(
  {children, gap = 0, align = 'flex-start', divider, p, m, br, b, bg, ...props},
  ref,
) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div css={vStackStyle({gap, align, p, m, br, b, bg})} ref={ref} {...props}>
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

export default VStack;
