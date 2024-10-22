/** @jsxImportSource @emotion/react */

import InputDelete from '@assets/image/inputDelete.svg';
import Error from '@assets/image/error.svg';
import Confirm from '@assets/image/confirm.svg';
import Trash from '@assets/image/trash.svg';
import TrashMini from '@assets/image/trash_mini.svg';
import Search from '@assets/image/search.svg';
import RightChevron from '@assets/image/rightChevron.svg';
import Check from '@assets/image/check.svg';
import X from '@assets/image/x.svg';
import PencilMini from '@assets/image/pencil_mini.svg';
import Meatballs from '@assets/image/meatballs.svg';
import EditPencil from '@assets/image/editPencil.svg';
import PhotoButton from '@assets/image/photoButton.svg';
import {IconProps} from '@HDcomponents/Icon/Icon.type';
import {useTheme} from '@theme/HDesignProvider';
import ChevronDownLarge from '@assets/image/chevronDownLarge.svg';

import {iconStyle} from './Icon.style';

export const ICON = {
  inputDelete: <InputDelete />,
  rightChevron: <RightChevron />,
  search: <Search />,
  error: <Error />,
  confirm: <Confirm />,
  trash: <Trash />,
  trashMini: <TrashMini />,
  check: <Check />,
  x: <X />,
  pencilMini: <PencilMini />,
  meatballs: <Meatballs />,
  editPencil: <EditPencil />,
  heundeut: <img src={`${process.env.IMAGE_URL}/heundeut.svg`} />,
  photoButton: <PhotoButton />,
  chevronDown: <ChevronDownLarge />,
} as const;

export const Icon = ({iconColor, iconType, ...htmlProps}: IconProps) => {
  const {theme} = useTheme();

  return (
    <div css={iconStyle({iconType, theme, iconColor})} {...htmlProps}>
      {ICON[iconType]}
    </div>
  );
};

export default Icon;
