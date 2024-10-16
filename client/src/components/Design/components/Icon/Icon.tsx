/** @jsxImportSource @emotion/react */

import Toss from '@assets/image/Toss_Symbol_Primary.png';
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

import {iconStyle} from './Icon.style';

export const ICON = {
  inputDelete: <InputDelete aria-label="지우기" />,
  rightChevron: <RightChevron aria-label="더보기" />,
  search: <Search aria-label="검색" />,
  error: <Error aria-label="오류" />,
  confirm: <Confirm aria-label="확인" />,
  trash: <Trash aria-label="삭제" />,
  trashMini: <TrashMini aria-label="삭제" />,
  check: <Check aria-label="선택" />,
  x: <X aria-label="x" />,
  pencilMini: <PencilMini aria-label="수정" />,
  toss: <img src={Toss} width="16" height="16" alt="toss icon" />,
  meatballs: <Meatballs aria-label="메뉴" />,
  editPencil: <EditPencil aria-label="수정" />,
  heundeut: <img src={`${process.env.IMAGE_URL}/heundeut.svg`} aria-label="행동대장 로고" />,
  photoButton: <PhotoButton aria-label="사진" />,
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
