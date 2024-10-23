import {useRef, useState} from 'react';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import {CarouselProps} from './Carousel.type';

const useCarousel = ({urls, onClickDelete}: CarouselProps) => {
  const startX = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {theme} = useTheme();

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX.current;
    setTranslateX(deltaX);
  };

  const threshold = window.screen.width / 10;

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

  return {handleDragStart, handleDrag, handleDragEnd, theme, currentIndex, translateX, isDragging, handleClickDelete};
};

export default useCarousel;
