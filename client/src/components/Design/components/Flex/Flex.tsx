/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {StrictPropsWithChildren} from '@type/strictPropsWithChildren';

import {useTheme} from '../../index';

import {FlexProps} from './Flex.type';
import {flexStyle} from './Flex.style';

// TODO: (@weadie) 지정된 프롭 말고 다른 프롭도 가져올 수 있게 하자.
const Flex = forwardRef<HTMLDivElement, StrictPropsWithChildren<FlexProps>>(({children, otherStyle, ...props}, ref) => {
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
      css={flexStyle({
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
      })}
      style={{...otherStyle}}
      {...htmlProps}
    >
      {children}
    </div>
  );
});

export default Flex;
