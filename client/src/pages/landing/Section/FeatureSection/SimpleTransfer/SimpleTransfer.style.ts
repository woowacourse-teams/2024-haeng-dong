import {css} from '@emotion/react';

export const sectionStyle = css({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const articleStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 4rem',
  alignItems: 'center',
  gap: '2rem',
  maxWidth: '1200px',
  '@media (max-width: 1024px)': {
    flexDirection: 'column',
  },
  '@media (min-width: 1200px)': {
    padding: '0',
  },
});

export const textContainerStyle = css({
  display: 'flex',
  width: 'max-content',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '1rem',
});

export const imageStyle = css({
  objectFit: 'contain',
  aspectRatio: '1/1',
  minWidth: '20rem',
  maxWidth: '30rem',
  width: '100%',
  '@media (min-width: 768px)': {
    minWidth: '25rem',
    maxWidth: '30rem',
    width: '100%',
  },
  '@media (min-width: 1600px)': {
    minWidth: '30rem',
    maxWidth: '35rem',
    width: '100%',
  },
});
