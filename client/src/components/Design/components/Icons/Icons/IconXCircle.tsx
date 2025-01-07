/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

import IconXCircleSvg from '@assets/image/x-circle.svg';

export const IconXCircle = ({color = 'gray', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconXCircleSvg />
    </Svg>
  );
};
