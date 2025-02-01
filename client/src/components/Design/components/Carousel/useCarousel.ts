import {useRef, useState} from 'react';

import {useTheme} from '@components/Design/theme/HDesignProvider';
import {useParentWidth} from '@components/Design/hooks/useParentWidth';

import {CarouselProps} from './Carousel.type';

const useCarousel = ({urls, onClickDelete}: CarouselProps) => {
  const startX = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const parentWidth = useParentWidth({elementRef: wrapperRef});
  const {theme} = useTheme();

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX.current;

    const resistance = 0.5;
    const resistedDelta = deltaX * resistance;

    setTranslateX(resistedDelta);
  };

  const threshold = parentWidth / 20;

  const handleDragEnd = () => {
    setIsDragging(false);
    if (-translateX > threshold) {
      setCurrentIndex(prev => (prev !== urls.length - 1 ? prev + 1 : prev));
    }
    if (+translateX > threshold) {
      setCurrentIndex(prev => (prev !== 0 ? prev - 1 : prev));
    }
    setTranslateX(0);
  };

  const handleClickDelete = (index: number) => {
    if (!onClickDelete) return;
    onClickDelete(index);
    if (urls.length !== 1 && index === urls.length - 1) setCurrentIndex(prev => prev - 1);
  };

  const handlePreventDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleToPrev = () => {
    setCurrentIndex(prev => (prev !== 0 ? prev - 1 : prev));
  };

  const handleToNext = () => {
    setCurrentIndex(prev => (prev !== urls.length - 1 ? prev + 1 : prev));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handleToPrev();
    if (e.key === 'ArrowRight') handleToNext();
  };

  return {
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
  };
};

export default useCarousel;
