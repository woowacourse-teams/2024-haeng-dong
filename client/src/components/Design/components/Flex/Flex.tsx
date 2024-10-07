/** @jsxImportSource @emotion/react */
import {StrictPropsWithChildren} from '@type/strictPropsWithChildren';

import {useTheme} from '../../index';

import {FlexProps} from './Flex.type';
import {flexStyle} from './Flex.style';

// TODO: (@weadie) 지정된 프롭 말고 다른 프롭도 가져올 수 있게 하자.
function Flex({children, cssProp, ...props}: StrictPropsWithChildren<FlexProps>) {
  const {theme} = useTheme();
  return <div css={[flexStyle({theme, ...props}), cssProp]}>{children}</div>;
}

export default Flex;
