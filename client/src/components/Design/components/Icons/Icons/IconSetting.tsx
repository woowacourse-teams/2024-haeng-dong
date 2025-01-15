/** @jsxImportSource @emotion/react */
import IconSettingSvg from '@assets/image/setting.svg';

import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconSetting = ({color = 'black', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconSettingSvg />
    </Svg>
  );
};
