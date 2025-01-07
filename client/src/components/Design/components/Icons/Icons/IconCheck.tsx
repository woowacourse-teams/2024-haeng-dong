/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';
import IconCheckSvg from '@assets/image/check.svg';

export const IconCheck = ({color = 'primary', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconCheckSvg />
    </Svg>
  );
};
