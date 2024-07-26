import {css} from '@emotion/react';

import {Theme} from '@/theme/theme.type';

export const searchStyle = css({
  position: 'relative',

  width: '100%',
});

export const searchTermsStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    top: '3.5rem',

    width: 'calc(100% - 2rem)',
    margin: '0 1rem',
    padding: '0.5rem 0',

    borderRadius: '1rem',

    backgroundColor: theme.colors.white,
  });

export const searchTermStyle = (theme: Theme) =>
  css(
    {
      width: '100%',
      padding: '0.5rem 1rem',

      color: theme.colors.onTertiary,

      '&:hover': {
        borderRadius: '0.5rem',

        backgroundColor: theme.colors.lightGrayContainer,
      },
    },
    theme.typography.body,
  );
