import {css} from '@emotion/react';

export const receiptStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingBottom: '8.75rem',
  });

export const titleAndListButtonContainerStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
  });

export const buttonGroupStyle = () =>
  css({
    display: 'flex',
    width: '100%',
    padding: '0 0.5rem',
    gap: '0.5rem',
  });
