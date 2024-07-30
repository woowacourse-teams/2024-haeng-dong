import {css} from '@emotion/react';

import {Theme} from '@/theme/theme.type';

export const labelGroupStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

    paddingInline: '0.5rem',
    marginBottom: '0.375rem',
  });

export const labelTextStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
  });

export const errorTextStyle = (theme: Theme) =>
  css({
    color: theme.colors.onErrorContainer,
  });
