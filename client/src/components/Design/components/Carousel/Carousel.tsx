/** @jsxImportSource @emotion/react */
import {CarouselProps} from './Carousel.type';
import CarouselIndicator from './CarouselIndicator';
import CarouselDeleteButton from './CarouselDeleteButton';
import {carouselWrapperStyle, imageCardContainerStyle, imageCardStyle, imageStyle} from './Carousel.style';
import useCarousel from './useCarousel';
import {CarouselChangeButton} from './CarouselChangeButton';

const Carousel = ({urls, onClickDelete}: CarouselProps) => {
  const {
    handleDragStart,
    handleDrag,
    handleDragEnd,
    theme,
    currentIndex,
    translateX,
    isDragging,
    handleClickDelete,
    handlePreventDrag,
    handleToPrev,
    handleToNext,
    handleKeyDown,
    parentWidth,
    wrapperRef,
  } = useCarousel({urls, onClickDelete});

  return (
    <div
      css={carouselWrapperStyle}
      role="region"
      aria-roledescription="carousel"
      aria-label="이미지 캐러샐"
      onKeyDown={handleKeyDown}
      ref={wrapperRef}
    >
      <div
        css={imageCardContainerStyle({currentIndex, length: urls.length, translateX, isDragging, parentWidth})}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        role="group"
        aria-roledescription="slide"
        aria-label={`전체 ${urls.length}장 중 ${currentIndex + 1}번째 이미지`}
      >
        {urls &&
          urls.map((url, index) => (
            <div key={url} css={imageCardStyle({theme, parentWidth})}>
              <img
                src={url}
                alt={`업로드된 이미지 ${index + 1}`}
                loading="lazy"
                decoding="async"
                css={imageStyle}
                onDragStart={handlePreventDrag}
                onDragEnd={handlePreventDrag}
              />
              {index !== 0 && (
                <CarouselChangeButton
                  direction="left"
                  onClick={handleToPrev}
                  tabIndex={currentIndex === index ? 0 : -1}
                />
              )}
              {index !== urls.length - 1 && (
                <CarouselChangeButton
                  direction="right"
                  onClick={handleToNext}
                  tabIndex={currentIndex === index ? 0 : -1}
                />
              )}
              {onClickDelete && (
                <CarouselDeleteButton
                  onClick={() => handleClickDelete(index)}
                  tabIndex={currentIndex === index ? 0 : -1}
                />
              )}
            </div>
          ))}
      </div>
      {urls.length !== 1 && <CarouselIndicator length={urls.length} currentIndex={currentIndex} />}
    </div>
  );
};

export default Carousel;
