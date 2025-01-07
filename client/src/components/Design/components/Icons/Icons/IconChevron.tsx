/** @jsxImportSource @emotion/react */
import {Direction, SvgProps} from '../Icon.type';
import Svg from '../Svg';
import IconChevronSvg from '@assets/image/chevron.svg';

export const IconChevron = ({color = 'tertiary', direction = 'down', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} direction={direction} {...rest}>
      <IconChevronSvg />
    </Svg>
  );
};
