import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

export const listItemStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '0.5rem',
    backgroundColor: theme.colors.white,
    padding: '0.5rem 1rem',
    borderRadius: '0.75rem',
  });

export const rowStyle = (theme: Theme) =>
  css({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  });
