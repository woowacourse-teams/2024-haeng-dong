/** @jsxImportSource @emotion/react */
import IconConfirmCircleSvg from '@assets/image/confirm-circle.svg';

import {SvgProps} from '../Icon.type';
import Svg from '../Svg';
export const IconConfirmCircle = ({color = 'complete', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconConfirmCircleSvg />
    </Svg>
  );
};
