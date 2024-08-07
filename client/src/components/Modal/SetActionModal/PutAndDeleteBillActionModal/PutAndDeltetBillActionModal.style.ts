import {css} from '@emotion/react';

export const bottomSheetStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
  height: '100%',
  padding: '0 1.5rem',
});

export const bottomSheetHeaderStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',

  width: '100%',
});

export const inputContainerStyle = css({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  gap: '1.5rem',
  overflow: 'auto',
  paddingBottom: '14rem',
});
