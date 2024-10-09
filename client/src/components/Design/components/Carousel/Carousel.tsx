/** @jsxImportSource @emotion/react */
import {CarouselProps} from './Carousel.type';
import CarouselIndicator from './CarouselIndicator';
import CarouselDeleteButton from './CarouselDeleteButton';
import {carouselWrapperStyle, imageCardContainerStyle, imageCardStyle, imageStyle} from './Carousel.style';
import useCarousel from './useCarousel';

const Carousel = ({urls, onClickDelete}: CarouselProps) => {
  const {handleDragStart, handleDrag, handleDragEnd, theme, currentIndex, translateX, isDragging, handleClickDelete} =
    useCarousel({urls, onClickDelete});

  return (
    <div css={carouselWrapperStyle}>
      <div
        css={imageCardContainerStyle}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
      >
        {urls &&
          urls.map((url, index) => (
            <div key={index} css={imageCardStyle({theme, currentIndex, length: urls.length, translateX, isDragging})}>
              <img src={url} alt={`업로드된 이미지 ${index + 1}`} css={imageStyle} />
              {onClickDelete && <CarouselDeleteButton onClick={() => handleClickDelete(index)} />}
            </div>
          ))}
        {urls.length !== 1 && <CarouselIndicator length={urls.length} currentIndex={currentIndex} />}
      </div>
    </div>
  );
};

export default Carousel;
