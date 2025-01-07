/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

import IconPictureSquareSvg from '@assets/image/picture-square.svg';

export const IconPictureSquare = ({color = 'white', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconPictureSquareSvg />
    </Svg>
  );
};
