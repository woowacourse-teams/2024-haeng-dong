/** @jsxImportSource @emotion/react */
import {StrictPropsWithChildren} from '@/types/strictPropsWithChildren';
import {FlexProps} from './Flex.type';
import {useTheme} from '@/theme/HDesignProvider';
import {flexStyle} from './Flex.style';

// TODO: (@weadie) 지정된 프롭 말고 다른 프롭도 가져올 수 있게 하자.
const Flex = ({children, ...props}: StrictPropsWithChildren<FlexProps>) => {
  const {theme} = useTheme();
  return <div css={flexStyle({theme, ...props})}>{children}</div>;
};

export default Flex;
