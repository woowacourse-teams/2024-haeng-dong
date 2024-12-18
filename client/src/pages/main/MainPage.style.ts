import {css} from '@emotion/react';

export const mainContainer = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100vw',
  height: '850vh',
  overflowX: 'hidden',
});

export const backgroundStyle = css({
  position: 'fixed',
  height: '100vh',
  width: '100vw',
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
