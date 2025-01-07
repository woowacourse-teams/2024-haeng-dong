/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

import IconTrashSvg from '@assets/image/trash.svg';

export const IconTrash = ({color = 'black', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconTrashSvg />
    </Svg>
  );
};
