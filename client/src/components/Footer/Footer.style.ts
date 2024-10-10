import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';
import TYPOGRAPHY from '@components/Design/token/typography';

export const footerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.625rem',
    marginTop: 'auto',
    marginBottom: '1.25rem',
    color: theme.colors.gray,

    '.footer-link-bundle': {
      display: 'flex',
      flexDirection: 'row',
      gap: '0.625rem',
    },

    a: {
      borderBottom: `1px solid ${theme.colors.gray}`,
      ...TYPOGRAPHY.tiny,
    },
  });
