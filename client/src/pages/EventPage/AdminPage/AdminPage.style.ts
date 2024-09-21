import {css} from '@emotion/react';

export const receiptStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingInline: '1rem',
    paddingBottom: '2rem',
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
