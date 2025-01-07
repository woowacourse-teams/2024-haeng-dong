/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

import IconMeatballsSvg from '@assets/image/meatballs.svg';

export const IconMeatballs = ({color = 'black', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconMeatballsSvg />
    </Svg>
  );
};
