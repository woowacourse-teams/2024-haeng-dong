/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

import {setDarker, setLighter} from '@utils/colors';

import {IconButtonSize, IconButtonStyleProps, IconButtonVariants} from './IconButton.type';

export const iconButtonStyle = (props: Required<IconButtonStyleProps>) => {
  if (props.variants === 'none') {
    return 'none';
  }
  return [
    getIconButtonBase(props.theme),
    getIconButtonSize(props.size),
    getIconButtonVariants(props.variants, props.theme),
  ];
};

const getHoverAndActiveBackground = (color: string) =>
  css({
    ':not(:disabled)': {
      '&:hover': {
        backgroundColor: setLighter(color, 0.15),
      },
      '&:active': {
        backgroundColor: setDarker(color, 0.15),
      },
    },
  });

const getIconButtonBase = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
    whiteSpace: 'nowrap',

    '&:disabled': {
      backgroundColor: theme.colors.tertiary,
      color: theme.colors.onPrimary,
      cursor: 'default',
    },
  });

const getIconButtonSize = (size: IconButtonSize) => {
  const style = {
    small: css({
      padding: '0.5rem',
      borderRadius: '0.75rem',
    }),
    medium: css({
      padding: '0.75rem',
      borderRadius: '1rem',
    }),
    large: css({
      padding: '1rem',
      borderRadius: '1.25rem',
    }),
  };

  return style[size];
};

const getIconButtonVariants = (variants: IconButtonVariants, theme: Theme) => {
  const style = {
    none: [css({})],
    primary: [
      css({
        backgroundColor: theme.colors.primary,
        color: theme.colors.onPrimary,
      }),
      getHoverAndActiveBackground(theme.colors.primary),
    ],
    secondary: [
      css({
        backgroundColor: theme.colors.secondary,
        color: theme.colors.onSecondary,
      }),
      getHoverAndActiveBackground(theme.colors.secondary),
    ],
    tertiary: [
      css({
        backgroundColor: theme.colors.tertiary,
        color: theme.colors.onTertiary,
      }),
      getHoverAndActiveBackground(theme.colors.tertiary),
    ],
    destructive: [
      css({
        backgroundColor: theme.colors.error,
        color: theme.colors.onPrimary,
      }),
      getHoverAndActiveBackground(theme.colors.error),
    ],
  };

  return style[variants];
};
