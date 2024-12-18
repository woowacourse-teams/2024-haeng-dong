import {css} from '@emotion/react';

export const stepButtonBoxStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  });

export const stepButtonGroupStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  });
