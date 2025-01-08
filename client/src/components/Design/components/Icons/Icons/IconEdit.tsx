/** @jsxImportSource @emotion/react */
import IconEditSvg from '@assets/image/edit.svg';

import {SvgProps} from '../Icon.type';
import Svg from '../Svg';
export const IconEdit = ({color = 'gray', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconEditSvg />
    </Svg>
  );
};
