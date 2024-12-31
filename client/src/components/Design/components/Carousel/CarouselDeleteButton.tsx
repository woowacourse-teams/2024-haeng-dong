/** @jsxImportSource @emotion/react */
import {IconX} from '../Icons/Icons/IconX';

import {deleteButtonStyle} from './Carousel.style';

interface Props {
  onClick: () => void;
}

const CarouselDeleteButton = ({onClick}: Props) => {
  return (
    <button css={deleteButtonStyle} onClick={onClick}>
      <IconX />
    </button>
  );
};

export default CarouselDeleteButton;
