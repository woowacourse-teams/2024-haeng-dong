import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

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
