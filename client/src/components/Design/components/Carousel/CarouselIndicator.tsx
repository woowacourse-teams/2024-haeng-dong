/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {indicatorContainerStyle, indicatorStyle} from './Carousel.style';

interface Props {
  length: number;
  currentIndex: number;
}

const CarouselIndicator = ({length, currentIndex}: Props) => {
  const {theme} = useTheme();

  return (
    <div css={indicatorContainerStyle}>
      {Array.from({length}).map((_, index) => (
        <div key={index} css={indicatorStyle({index, currentIndex, theme})} />
      ))}
    </div>
  );
};

export default CarouselIndicator;
