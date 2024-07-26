import {css} from '@emotion/react';

import {Theme} from '@/theme/theme.type';

export const textStyle = (theme: Theme) =>
  css({
    color: theme.colors.black,
  });
