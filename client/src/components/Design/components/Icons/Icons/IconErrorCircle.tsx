/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';
import IconErrorCircleSvg from '@assets/image/error-circle.svg';

export const IconErrorCircle = ({color = 'error', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconErrorCircleSvg />
    </Svg>
  );
};
