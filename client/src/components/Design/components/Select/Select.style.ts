import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const selectStyle = css({
  position: 'relative',

  width: '100%',
});

export const optionListStyle = (theme: Theme, isOpen: boolean) =>
  css({
    position: 'absolute',
    top: '5.5rem',
    zIndex: theme.zIndex.selectOption,

    width: '100%',
    padding: '0.5rem',

    borderRadius: '1rem',
    boxShadow: `0 0 0 1px ${theme.colors.primary} inset`,

    backgroundColor: theme.colors.white,

    visibility: isOpen ? 'visible' : 'hidden',
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 0.2s cubic-bezier(0.7, 0.62, 0.62, 1.16), transform 0.2s cubic-bezier(0.7, 0.62, 0.62, 1.16)',
  });

export const optionStyle = (theme: Theme) =>
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
