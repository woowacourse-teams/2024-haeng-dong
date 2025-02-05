import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

import {Direction} from '../Icons/Icon.type';

export const carouselWrapperStyle = css`
  position: relative;
  overflow: hidden;
  display: flex;
`;

interface ImageCardContainerStyleProps {
  currentIndex: number;
  length: number;
  translateX: number;
  isDragging: boolean;
  parentWidth: number;
}

export const imageCardContainerStyle = ({
  currentIndex,
  length,
  translateX,
  isDragging,
  parentWidth,
}: ImageCardContainerStyleProps) => css`
  display: flex;
  gap: 1rem;
  margin-inline: 2rem;
  transform: translate3d(
    calc(
      (${parentWidth}px - 3rem) * ${-currentIndex} +
        ${(currentIndex === 0 && translateX > 0) || (currentIndex === length - 1 && translateX < 0) ? 0 : translateX}px
    ),
    0,
    0
  );
  will-change: transform;
  backface-visibility: hidden;
  transition: ${isDragging ? 'none' : '0.2s'};
  transition-timing-function: cubic-bezier(0.7, 0.62, 0.62, 1.16);
`;

interface ImageCardStyleProps {
  theme: Theme;
  parentWidth: number;
}

export const imageCardStyle = ({theme, parentWidth}: ImageCardStyleProps) => css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: inset(0 round 1rem);
  width: ${parentWidth ? `calc(${parentWidth}px - 4rem)` : 'calc(430px - 4rem)'};
  background-color: ${theme.colors.gray};
`;

export const imageStyle = css`
  width: calc(100vw - 4rem);
  aspect-ratio: 3/4;
  object-fit: contain;
`;

export const deleteButtonStyle = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  opacity: 0.48;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const indicatorContainerStyle = css`
  position: absolute;
  left: 50%;
  top: 1rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.25rem;
  width: 8rem;
`;

interface IndicatorStyleProps {
  index: number;
  currentIndex: number;
  theme: Theme;
}

export const indicatorStyle = ({index, currentIndex, theme}: IndicatorStyleProps) => css`
  width: 100%;
  height: 0.125rem;
  border-radius: 0.0625rem;
  opacity: ${index !== currentIndex ? 0.48 : 1};
  background-color: ${index !== currentIndex ? theme.colors.lightGrayContainer : theme.colors.primary};
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.7, 0.62, 0.62, 1.16);
  content: ' ';
`;

export const changeButtonStyle = (direction: Direction) => css`
  position: absolute;
  ${direction === ('left' as Direction) ? 'left' : 'right'}: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem;
  opacity: 0.48;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
