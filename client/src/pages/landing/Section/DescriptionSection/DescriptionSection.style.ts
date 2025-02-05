import {css} from '@emotion/react';

export const descriptionSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  gap: '1.5rem',
  padding: '3rem 1.5rem',
  backgroundColor: 'white',
});

export const imgStyle = css({
  width: '10rem',
  '@media (min-width: 768px)': {
    minWidth: '10rem',
    maxWidth: '15rem',
    width: '100%',
  },
  '@media (min-width: 1600px)': {
    minWidth: '15rem',
    maxWidth: '20rem',
    width: '100%',
  },
});
