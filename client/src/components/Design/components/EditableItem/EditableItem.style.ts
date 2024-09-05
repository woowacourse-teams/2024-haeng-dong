import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

import {ColorKeys} from '@token/colors';

export const editableItemStyle = (theme: Theme, backgroundColor: ColorKeys) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
    borderRadius: '0.75rem',
    backgroundColor: theme.colors[backgroundColor],
  });

export const labelTextStyle = (theme: Theme, side: 'prefix' | 'suffix') =>
  css({
    color: theme.colors.gray,
    paddingLeft: side === 'prefix' ? '0.375rem' : 0,
    paddingRight: side === 'suffix' ? '0.375rem' : 0,
  });
