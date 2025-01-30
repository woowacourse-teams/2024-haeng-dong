/** @jsxImportSource @emotion/react */
import {Direction} from '../Icons/Icon.type';
import {IconChevron} from '../Icons/Icons/IconChevron';
import {changeButtonStyle} from './Carousel.style';

interface Props {
  direction: Direction;
  onClick: () => void;
  tabIndex: number;
}

export const CarouselChangeButton = ({direction, onClick, tabIndex}: Props) => {
  return (
    <button onClick={onClick} css={changeButtonStyle(direction)} tabIndex={tabIndex}>
      <IconChevron size={16} direction={direction} />
    </button>
  );
};
