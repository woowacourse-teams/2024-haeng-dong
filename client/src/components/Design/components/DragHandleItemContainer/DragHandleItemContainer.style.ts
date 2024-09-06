import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';
import {ColorKeys} from '@token/colors';

export const containerStyle = (theme: Theme, backgroundColor: ColorKeys) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.75rem',
    backgroundColor: theme.colors[backgroundColor],
  });

export const topRightTextStyle = (theme: Theme) =>
  css({
    position: 'relative',
    cursor: 'pointer',

    '&::after': {
      position: 'absolute',
      bottom: '0.125rem',
      left: 0,

      width: '100%',
      height: '0.03125rem',

      backgroundColor: theme.colors.gray,

      content: "''",
    },
  });
