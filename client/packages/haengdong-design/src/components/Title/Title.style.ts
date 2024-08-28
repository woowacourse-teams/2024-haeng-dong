import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const titleContainerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '0.5rem',
    backgroundColor: theme.colors.white,
    padding: '1rem',
  });

export const priceContainerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
});
