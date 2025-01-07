/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';
import IconConfirmCircleSvg from '@assets/image/confirm-circle.svg';
export const IconConfirmCircle = ({color = 'complete', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconConfirmCircleSvg />
    </Svg>
  );
};
