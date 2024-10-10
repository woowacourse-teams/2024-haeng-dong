/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {StrictPropsWithChildren} from '@type/strictPropsWithChildren';

import {useTheme} from '../../index';

import {FlexProps} from './Flex.type';
import {flexStyle} from './Flex.style';

const Flex = forwardRef<HTMLDivElement, StrictPropsWithChildren<FlexProps>>(({children, cssProp, ...props}, ref) => {
  const {theme} = useTheme();

  const {
    justifyContent,
    alignItems,
    flexDirection,
    gap,
    padding,
    paddingInline,
    margin,
    width,
    height,
    backgroundColor,
    minHeight,
    ...htmlProps
  } = props;

  return (
    <div
      ref={ref}
      css={[
        flexStyle({
          theme,
          justifyContent,
          alignItems,
          flexDirection,
          gap,
          padding,
          paddingInline,
          margin,
          width,
          height,
          backgroundColor,
          minHeight,
        }),
        cssProp,
      ]}
      {...htmlProps}
    >
      {children}
    </div>
  );
});

export default Flex;
