import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const expenseListStyle = (theme: Theme) =>
  css({
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: '0.5rem 1rem',
    borderRadius: '1rem',
    height: '100%',
  });
