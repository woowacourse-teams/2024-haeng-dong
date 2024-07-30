import {css} from '@emotion/react';

import {Theme} from '@/theme/theme.type';

export const toastStyle = (top: number, isShow: boolean, theme: Theme) =>
  css({
    display: isShow ? 'flex' : 'none',
    alignItems: 'center',

    position: 'absolute',
    top: `${top}%`,
    left: 0,
    gap: '0.5rem',

    maxWidth: '48rem',
    width: '100%',
    margin: '1.25rem',
    padding: '0.625rem',

    backgroundColor: theme.colors.gray,
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.16);',

    borderRadius: '1.25rem',
  });

export const textStyle = (theme: Theme) =>
  css({
    width: '100%',

    color: theme.colors.white,

    whiteSpace: 'pre-line',
  });
