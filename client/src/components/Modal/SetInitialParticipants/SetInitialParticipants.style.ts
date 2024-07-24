import {css} from '@emotion/react';

export const setInitialParticipantsStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    height: '100%',
    padding: '0 1.5rem',
  });

export const setInitialParticipantsInputGroupStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflow: 'auto',
    paddingBottom: '11rem',
  });
