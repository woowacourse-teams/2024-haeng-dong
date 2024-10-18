import {css} from '@emotion/react';

export const navFixedStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem 0',
  width: '100%',
  backgroundColor: 'white',
});

export const navWrapperStyle = css({
  maxWidth: '1200px',
  width: '100%',
});

export const navStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '2.5rem',
});
