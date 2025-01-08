/** @jsxImportSource @emotion/react */
import IconTrashSvg from '@assets/image/trash.svg';

import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconTrash = ({color = 'black', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconTrashSvg />
    </Svg>
  );
};
