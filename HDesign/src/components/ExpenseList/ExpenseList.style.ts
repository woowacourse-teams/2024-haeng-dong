import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const expenseItemStyle = () =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '2.5rem',
    padding: '0.5rem 1rem',
  });

export const expenseItemLeftStyle = () =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  });

export const TextStyle = (theme: Theme) =>
  css({
    color: theme.colors.onTertiary,
  });

export const expenseListStyle = (theme: Theme) =>
  css({
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: '0.5rem 0',
    borderRadius: '1rem',
    height: '100%',
  });
