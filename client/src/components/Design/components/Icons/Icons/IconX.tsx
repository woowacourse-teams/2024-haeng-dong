/** @jsxImportSource @emotion/react */
import IconXSvg from '@assets/image/x.svg';

import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconX = ({color = 'gray', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconXSvg />
    </Svg>
  );
};
