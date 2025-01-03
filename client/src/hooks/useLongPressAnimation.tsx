import {css, keyframes} from '@emotion/react';
import {useMemo, useRef, useState} from 'react';

import {WithTheme} from '@components/Design/type/withTheme';
import {ColorKeys} from '@components/Design/token/colors';

import {useTheme} from '@components/Design';

export type AnimationCoordinate = {
  x: number;
  y: number;
  size: number;
};

const animationFrame = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
`;

const defaultAnimationColor: ColorKeys = 'grayContainer';
const defaultLongPressTime = 500;

const animationStyle = ({
  theme,
  x,
  y,
  size,
  animationColor = defaultAnimationColor,
  longProgressTime = defaultLongPressTime,
}: WithTheme<AnimationCoordinate & UseLongPressAnimationOptions>) => {
  const remSize = size / 16;
  const remX = x / 16;
  const remY = y / 16;
  const animationTime = longProgressTime / 1000;

  return css({
    position: 'absolute',
    top: `${remY - remSize / 2}rem`,
    left: `${remX - remSize / 2}rem`,
    width: `${remSize}rem`,
    height: `${remSize}rem`,
    background: theme.colors[animationColor],
    borderRadius: `50%`,
    transform: 'scale(1)',
    animation: `${animationFrame} ${animationTime}s ease-out forwards`,
  });
};

type UseLongPressAnimationOptions = {
  longProgressTime?: number;
  animationColor?: ColorKeys;
};

const useLongPressAnimation = (onLongPress: () => void, options?: UseLongPressAnimationOptions) => {
  const {theme} = useTheme();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [coordinate, setCoordinate] = useState<AnimationCoordinate | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setCoordinate({x, y, size: 0});

    timeoutRef.current = setTimeout(() => {
      onLongPress();
    }, options?.longProgressTime ?? defaultLongPressTime);
  };

  const handleTouchMove = () => {
    clearTimeout(timeoutRef.current!);
    setCoordinate(null);
  };

  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = null;
  };

  const LongPressAnimation = useMemo(() => {
    return coordinate ? (
      <div
        css={animationStyle({
          theme,
          ...options,
          ...coordinate,
        })}
        onAnimationStart={() => setCoordinate(prev => prev && {...prev, size: 800})}
      />
    ) : null;
  }, [coordinate]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    LongPressAnimation,
  };
};

export default useLongPressAnimation;
