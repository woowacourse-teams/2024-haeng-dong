/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import IconSearchSvg from '@assets/image/search.svg';

import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconSearch = ({color = 'gray', ...rest}: Omit<SvgProps, 'children'>) => {
  return (
    <Svg color={color} {...rest}>
      <IconSearchSvg />
    </Svg>
  );
};
