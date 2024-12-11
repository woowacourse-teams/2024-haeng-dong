import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

export const profileContainerStyle = (theme: Theme, size: number) =>
  css({
    display: 'flex',

    width: `${size}px`,
    height: `${size}px`,

    borderRadius: '50%',

    backgroundColor: theme.colors.white,

    objectFit: 'cover',
  });
