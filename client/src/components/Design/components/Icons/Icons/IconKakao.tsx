/** @jsxImportSource @emotion/react */
import IconKakaoSvg from '@assets/image/kakao.svg';

import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconKakao = ({color = 'onKakao', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconKakaoSvg />
    </Svg>
  );
};
