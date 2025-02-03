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
    <button
      onClick={onClick}
      css={changeButtonStyle(direction)}
      tabIndex={tabIndex}
      aria-label={`${direction === 'left' ? '이전' : '다음'} 이미지`}
    >
      <IconChevron size={16} direction={direction} />
    </button>
  );
};
