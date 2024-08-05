import {css} from '@emotion/react';
import {Theme} from 'haengdong-design/dist/theme/theme.type';

export const bottomSheetStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
  height: '100%',
  padding: '0 1.5rem',
});

export const inputGroupStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  overflow: 'auto',
  paddingBottom: '11rem',
});

// 이거 행동 디자인에서 만들어져야하는데
export const buttonStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',

  width: '3rem',

  borderRadius: '1rem',

  backgroundColor: 'gray',
});
