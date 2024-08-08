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
