import {css} from '@emotion/react';

export const container = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '0 1.5rem',
  gap: '1.5rem',
});

export const switchContainer = css({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});

const setActionListModalStyle = {container, switchContainer};

export default setActionListModalStyle;
