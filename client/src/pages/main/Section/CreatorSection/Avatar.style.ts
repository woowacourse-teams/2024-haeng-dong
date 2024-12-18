import {css} from '@emotion/react';

export const avatarStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  '@media (min-width: 1200px)': {
    gap: '1rem',
  },
});

export const avatarImageStyle = css({
  width: '100%',
  height: '100%',
  borderRadius: '25%',
});
