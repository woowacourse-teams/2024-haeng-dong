import {css} from '@emotion/react';

export const updateParticipantsStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    height: '100%',
  });

export const updateParticipantsInputStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflow: 'auto',
    paddingBottom: '14rem',
  });
