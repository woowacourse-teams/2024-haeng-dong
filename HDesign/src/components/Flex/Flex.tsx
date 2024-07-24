/** @jsxImportSource @emotion/react */
import {StrictPropsWithChildren} from '@/types/strictPropsWithChildren';
import {changeCamelCaseToKebabCase} from '@/utils/ return str.replace(/([a-z])([A-Z])/changeCamelCaseToKebabCase';
import {css} from '@emotion/react';
import {FlexDirectionStrictType, FlexProps} from './Flex.type';

const flexStyle = ({
  justifyContent = 'flexStart',
  alignItems = 'stretch',
  flexDirection = 'row',
  gap = '0',
  padding = '0',
  paddingInline = '0',
  margin = '0',
  width = 'auto',
  height = 'auto',
  ...rest
}: FlexProps) =>
  css({
    display: 'flex',
    justifyContent: changeCamelCaseToKebabCase(justifyContent),
    alignItems: changeCamelCaseToKebabCase(alignItems),
    // TODO: (@weadie) as를 사용하지 않으면 방법이 없음. css의 flexDirection속성은 string을 받지 않고 명확한 속성명(ex row-reverse)를 받고 싶어함. 다만 as를 사용해도 된다고 생각한 근거는 케밥함수가 FlexDirectionType에 명시된 모든 타입을 정확하게 변환하며, 받는 문자열이 FlexDirectionType에 제한되기 때문.
    flexDirection: changeCamelCaseToKebabCase(flexDirection) as FlexDirectionStrictType,
    gap,
    padding,
    paddingInline,
    margin,
    width,
    height,
    ...rest,
  });

// TODO: (@weadie) 지정된 프롭 말고 다른 프롭도 가져올 수 있게 하자.
const Flex = ({children, ...props}: StrictPropsWithChildren<FlexProps>) => {
  return <div css={flexStyle(props)}>{children}</div>;
};

export default Flex;
