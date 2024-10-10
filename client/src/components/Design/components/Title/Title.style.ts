import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const titleStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '0.5rem',
    backgroundColor: theme.colors.white,
    padding: '0.5rem',
    borderRadius: '0.75rem',
  });

export const titleContainerStyle = (hasDropdown: boolean) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '0.5rem',
    paddingRight: hasDropdown ? '0' : '0.5rem',
  });

export const amountContainerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
  paddingInline: '0.5rem',
});
