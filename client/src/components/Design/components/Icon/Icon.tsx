/** @jsxImportSource @emotion/react */

import {IconProps} from '@HDcomponents/Icon/Icon.type';
import {InputDelete, Buljusa, RightChevron, Search, Trash, Confirm, Error} from '@HDassets/index';
import {useTheme} from '@theme/HDesignProvider';

import {iconStyle} from './Icon.style';

const ICON = {
  inputDelete: <InputDelete />,
  buljusa: <Buljusa />,
  rightChevron: <RightChevron />,
  search: <Search />,
  error: <Error />,
  confirm: <Confirm />,
  trash: <Trash />,
};

export const Icon: React.FC<IconProps> = ({iconColor, iconType, ...htmlProps}: IconProps) => {
  const {theme} = useTheme();
  return (
    <div css={iconStyle({iconType, theme, iconColor})} {...htmlProps}>
      {ICON[iconType]}
    </div>
  );
};

export default Icon;
