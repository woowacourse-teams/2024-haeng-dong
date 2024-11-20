import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

export const hrStyle = (theme: Theme) =>
  css({
    width: '100%',
    height: 1,

    backgroundColor: theme.colors.tertiary,
  });
