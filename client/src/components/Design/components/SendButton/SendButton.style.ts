import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

export const sendButtonStyle = (theme: Theme, disabled: boolean) =>
  css({
    width: '3.25rem',
    height: '1.5rem',

    backgroundColor: disabled ? theme.colors.grayContainer : theme.colors.tertiary,

    borderRadius: '0.5rem',
  });
