import {css} from '@emotion/react';

import ImageSprite from '@assets/image/banksprite.png';

export const bankButtonStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  width: '100%',
});

export const iconStyle = (position: string) =>
  css({
    width: '80px',
    height: '80px',
    background: `url(${ImageSprite}) ${position}`,
  });

export const bankSelectStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridRowGap: '1rem',
  gridColumnGap: '2rem',
  placeItems: 'center',

  height: '100%',

  '@media (min-width: 450px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },

  overflowY: 'scroll',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});
