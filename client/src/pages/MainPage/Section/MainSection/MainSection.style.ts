import {css, keyframes} from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(1rem);
  }
  to {
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, -1rem);
  }
`;

export const animateWithDelay = (delay: number) => css`
  opacity: 0;
  animation:
    ${fadeIn} 1s ease-in-out ${delay}s forwards,
    ${slideIn} 1s ease-in-out ${delay}s forwards;
`;

export const mainSectionStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
});

export const backgroundStyle = css({
  position: 'fixed',
  height: '100vh',
  top: 0,
  zIndex: -1,
  backgroundColor: '#000000',
});

export const backgroundImageStyle = (isVisible: boolean) =>
  css({
    objectFit: 'cover',
    height: '100vh',
    width: '100vw',
    opacity: isVisible ? 1 : 0,
  });

export const sectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2rem',
  padding: '1.5rem',
  height: '100%',
});

export const chevronStyle = css({
  position: 'absolute',
  bottom: '2rem',
  left: '50%',
  animation: `${bounce} 2s infinite ease-in-out`,
});
