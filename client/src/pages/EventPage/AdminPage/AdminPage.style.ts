import {css} from '@emotion/react';

export const receiptStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 8px',
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
    gap: '0.5rem',
  });
