import {css} from '@emotion/react';

export const setPurchaseStyle = () =>
  css({
    height: '100%',
  });

export const setPurchaseInputContainerStyle = () =>
  css({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: '1.5rem',
    overflow: 'auto',
    paddingBottom: '14rem',
  });

export const setPurchaseInputStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  });
