/** @jsxImportSource @emotion/react */
import Icon from '../Iconx/Icon';

import {deleteButtonStyle} from './Carousel.style';

interface Props {
  onClick: () => void;
}

const CarouselDeleteButton = ({onClick}: Props) => {
  return (
    <button css={deleteButtonStyle} onClick={onClick}>
      <Icon iconType="x" />
    </button>
  );
};

export default CarouselDeleteButton;
