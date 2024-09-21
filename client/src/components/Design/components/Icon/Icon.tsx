/** @jsxImportSource @emotion/react */

import Toss from '@assets/image/Toss_Symbol_Primary.png';
import InputDelete from '@assets/image/inputDelete.svg';
import Buljusa from '@assets/image/buljusa.svg';
import Error from '@assets/image/error.svg';
import Confirm from '@assets/image/confirm.svg';
import Trash from '@assets/image/trash.svg';
import Search from '@assets/image/search.svg';
import RightChevron from '@assets/image/rightChevron.svg';
import Check from '@assets/image/check.svg';
import X from '@assets/image/x.svg';
import Meatballs from '@assets/image/meatballs.svg';
import {IconProps} from '@HDcomponents/Icon/Icon.type';
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
  toss: <img src={Toss} width="16" height="16" alt="toss icon" />,
  check: <Check />,
  x: <X />,
  meatballs: <Meatballs />,
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
