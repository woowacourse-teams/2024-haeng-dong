/** @jsxImportSource @emotion/react */
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

import IconKakaoSvg from '@assets/image/kakao.svg';

export const IconKakao = ({color = 'onKakao', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconKakaoSvg />
    </Svg>
  );
};
