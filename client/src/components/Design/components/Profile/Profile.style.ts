import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

import {ProfileSize} from './Profile.type';

const SEMANTIC_SIZE: Record<ProfileSize, string> = {
  small: '1rem',
  medium: '1.75rem',
  large: '3rem',
};

export const profileContainerStyle = (theme: Theme, size: ProfileSize) => {
  return css({
    display: 'flex',

    width: SEMANTIC_SIZE[size],
    height: SEMANTIC_SIZE[size],

    borderRadius: '50%',

    backgroundColor: theme.colors.white,

    objectFit: 'cover',
  });
};
