import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const depositToggleStyle = (theme: Theme) =>
  css({
    display: `flex`,
    flexDirection: 'column',
    padding: '0.25rem',
    borderRadius: '12px',
    backgroundColor: theme.colors.tertiary,

    p: {
      padding: '1px 4px',
      borderRadius: '8px',
      width: '100%',
      textAlign: 'center',
      color: theme.colors.gray,
    },

    '& .on-toggle': {
      backgroundColor: theme.colors.white,
      '&.completed': {
        color: theme.colors.onTertiary,
      },

      '&.not-completed': {
        color: theme.colors.error,
      },
    },
  });
