import {css} from '@emotion/react';

export const sectionStyle = css({
  display: 'flex',
  padding: '4rem 0',
  minHeight: '100vh',
  width: '100vw',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000000',
  gap: '2rem',
  marginTop: 'auto',
});

export const partStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
});

export const avatarContainerStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  width: '100%',
  padding: '0 4rem',
  gap: '1rem',
  maxWidth: '1200px',
  '@media (min-width: 640px)': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
  },
  '@media (min-width: 1024px)': {
    gap: '6rem',
  },
});
