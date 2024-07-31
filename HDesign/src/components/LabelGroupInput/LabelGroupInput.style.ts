import {css} from '@emotion/react';

import {Theme} from '@/theme/theme.type';

export const labelInputStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
});

export const labelGroupStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',

  paddingInline: '0.5rem',
  marginBottom: '0.375rem',
});

export const inputGroupStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const labelTextStyle = (theme: Theme) =>
  css({
    height: '1.125rem',
    color: theme.colors.gray,
  });

export const errorTextStyle = (theme: Theme) =>
  css({
    height: '1.125rem',
    color: theme.colors.onErrorContainer,
  });
