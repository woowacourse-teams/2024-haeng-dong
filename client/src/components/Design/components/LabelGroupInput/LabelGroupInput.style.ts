import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const labelTextStyle = (theme: Theme, hasFocus: boolean, hasValue: boolean) =>
  css({
    height: '1.125rem',
    color: theme.colors.gray,

    opacity: hasFocus || hasValue ? '1' : '0',

    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
  });

export const errorTextStyle = (theme: Theme, isError: boolean) =>
  css({
    height: '1.125rem',
    color: theme.colors.onErrorContainer,

    opacity: isError ? '1' : '0',

    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
  });
