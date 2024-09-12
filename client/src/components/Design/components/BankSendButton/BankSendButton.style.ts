import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

export const bankButtonStyle = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.125rem 0.34375rem',

    backgroundColor: theme.colors.tertiary,

    borderRadius: '0.5rem',
  });
