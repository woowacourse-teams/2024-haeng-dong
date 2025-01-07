/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';
import IconEditSvg from '@assets/image/edit.svg';
export const IconEdit = ({color = 'gray', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconEditSvg />
    </Svg>
  );
};
