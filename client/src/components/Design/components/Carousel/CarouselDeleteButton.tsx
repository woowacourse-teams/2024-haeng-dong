/** @jsxImportSource @emotion/react */
import {IconX} from '../Icons/Icons/IconX';

import {deleteButtonStyle} from './Carousel.style';

interface Props {
  onClick: () => void;
  tabIndex: number;
}

const CarouselDeleteButton = ({onClick, tabIndex}: Props) => {
  return (
    <button css={deleteButtonStyle} onClick={onClick} tabIndex={tabIndex} aria-label="이미지 삭제">
      <IconX />
    </button>
  );
};

export default CarouselDeleteButton;
