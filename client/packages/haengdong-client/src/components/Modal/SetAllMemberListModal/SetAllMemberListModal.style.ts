import {css} from '@emotion/react';

export const allMemberListModalStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    height: '100%',
  });

export const allMemberListModalTitleStyle = () =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 1.5rem',
  });

export const allMemberListModalLabelGroupInputStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem',
    paddingBottom: '10rem',

    overflow: 'auto',
  });

export const InputAndDeleteButtonContainer = () =>
  css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '1rem',
  });
