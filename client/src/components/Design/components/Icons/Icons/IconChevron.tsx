/** @jsxImportSource @emotion/react */
import IconChevronSvg from '@assets/image/chevron.svg';

import {Direction, SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconChevron = ({color = 'tertiary', direction = 'down', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} direction={direction} {...rest}>
      <IconChevronSvg />
    </Svg>
  );
};
