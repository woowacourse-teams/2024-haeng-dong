import {css, keyframes} from '@emotion/react';

const movingFrames = keyframes`
  0% { transform: translate(4px, 50%) scale(0); }
  25% { transform: translate(4px, 50%) scale(0); }
  50% { transform: translate(4px, 50%) scale(1); }
  75% { transform: translate(16px, 50%) scale(1); }
  100% { transform: translate(28px, 50%) scale(1); }
`;

const disappearFrames = keyframes`
  0% { transform: translate(28px, 50%) scale(1); }
  100% { transform: translate(28px, 50%) scale(0); }
`;

export const lottieStyle = (frameColors: string[]) =>
  css({
    width: '100%',
    height: '100%',
    position: 'relative',
    transform: 'translateZ(0) scale(1)',
    backfaceVisibility: 'hidden',
    transformOrigin: '0 0',

    div: {
      position: 'absolute',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      transform: 'translate(16px, 50%) scale(1)',
      background: frameColors[3],
      animation: `${movingFrames} 1s infinite cubic-bezier(0, 0.5, 0.5, 1)`,
      boxSizing: 'content-box',

      '&:nth-of-type(1)': {
        background: frameColors[2],
        transform: 'translate(28px, 50%) scale(1)',
        animation: `${disappearFrames} 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1)`,
      },
      '&:nth-of-type(2)': {
        animationDelay: '-0.25s',
        background: frameColors[3],
      },
      '&:nth-of-type(3)': {
        animationDelay: '-0.5s',
        background: frameColors[2],
      },
      '&:nth-of-type(4)': {
        animationDelay: '-0.75s',
        background: frameColors[1],
      },
      '&:nth-of-type(5)': {
        animationDelay: '-1s',
        background: frameColors[0],
      },
    },
  });

export const lottieContainerStyle = () =>
  css({
    width: '40px',
    height: '20px',
    display: 'inline-block',
    overflow: 'hidden',
    background: 'none',
  });
