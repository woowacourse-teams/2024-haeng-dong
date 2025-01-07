/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

import IconXSvg from '@assets/image/x.svg';

export const IconX = ({color = 'gray', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconXSvg />
    </Svg>
  );
};
