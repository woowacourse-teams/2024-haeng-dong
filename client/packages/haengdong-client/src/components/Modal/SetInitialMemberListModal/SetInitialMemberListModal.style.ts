import {css} from '@emotion/react';

export const setInitialMemberListModalStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    height: '100%',
    padding: '0 1.5rem',
  });

export const setInitialMemberListModalInputGroupStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflow: 'auto',
    paddingBottom: '11rem',
  });
