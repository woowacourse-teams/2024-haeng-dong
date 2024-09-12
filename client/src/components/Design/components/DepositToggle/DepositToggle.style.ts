import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const depositToggleStyle = (theme: Theme) =>
  css({
    display: `flex`,
    flexDirection: 'column',
    padding: '0.25rem',
    borderRadius: '0.75rem',
    backgroundColor: theme.colors.tertiary,
    cursor: 'pointer',
    width: '4rem',

    div: {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '0.5rem',
      padding: ' 0.125rem 0 0 0',
    },

    '& .on-toggle': {
      backgroundColor: theme.colors.white,
    },
  });
