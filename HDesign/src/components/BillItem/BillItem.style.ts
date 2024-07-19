import {Theme} from '@/theme/theme.type';
import {css} from '@emotion/react';

export const textStyle = (theme: Theme) =>
  css({
    color: theme.colors.black,
  });
