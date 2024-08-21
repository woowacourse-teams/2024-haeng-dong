import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const searchStyle = css({
  position: 'relative',

  width: '100%',
});

export const searchTermsStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    top: '3.5rem',
    zIndex: 1,

    width: '100%',
    padding: '0.5rem 1rem',

    borderRadius: '1rem',

    backgroundColor: theme.colors.white,

    boxShadow: '0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.12)',
  });

export const searchTermStyle = (theme: Theme) =>
  css(
    {
      width: '100%',
      padding: '0.5rem',

      color: theme.colors.onTertiary,

      '&:hover': {
        borderRadius: '0.5rem',

        backgroundColor: theme.colors.lightGrayContainer,
      },
    },
    theme.typography.body,
  );
