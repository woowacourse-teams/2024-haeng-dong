import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

export const bankButtonStyle = (theme: Theme) =>
  css({
    width: '3.25rem',
    height: '1.5rem',

    backgroundColor: theme.colors.tertiary,

    borderRadius: '0.5rem',
  });

export const isDepositedStyle = (theme: Theme) =>
  css({
    width: '3.25rem',
    height: '1.5rem',

    backgroundColor: theme.colors.grayContainer,

    borderRadius: '0.5rem',
  });
