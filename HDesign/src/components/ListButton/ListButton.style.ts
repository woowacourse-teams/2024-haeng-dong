/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const listButtonStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0.375rem 1rem',
    backgroundColor: theme.colors.white,

    boxShadow: `0 1px 0 0 ${theme.colors.grayContainer} inset `,
  });

export const textStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
  });
