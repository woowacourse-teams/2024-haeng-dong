import {css} from '@emotion/react';

export const navStyle = css({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',

  top: '0',
  width: '100%',
  maxWidth: '768px',
  zIndex: '20',
  height: '4rem',
  backgroundColor: 'white',
});

export const logoStyle = css({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});
