import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

export const mockImageStyle = (theme: Theme) =>
  css({
    width: '3rem',
    height: '3rem',

    borderRadius: '50%',
    backgroundColor: theme.colors.gray,
  });
