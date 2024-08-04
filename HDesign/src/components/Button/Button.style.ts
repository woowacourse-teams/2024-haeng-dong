import {css} from '@emotion/react';

import {Theme} from '../../theme/theme.type';

import {ButtonStyleProps, ButtonSize, ButtonVariants} from './Button.type';

import {setDarker, setEmphasize, setLighter} from '@utils/colors';

export const buttonStyle = (props: Required<ButtonStyleProps>) => {
  return [
    getButtonDefaultStyle(props.theme),
    getButtonSizeStyle(props.size),
    getButtonVariantsStyle(props.variants, props.theme),
  ];
};

const getButtonDefaultStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '1',
    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
<<<<<<< Updated upstream
    whiteSpace: 'nowrap',
=======
>>>>>>> Stashed changes

    '&:disabled': {
      backgroundColor: theme.colors.tertiary,
      color: theme.colors.onPrimary,
      cursor: 'default',
    },
  });

const getButtonSizeStyle = (size: ButtonSize) => {
  const style = {
    small: css({
      padding: '0.5rem 0.75rem',
      borderRadius: '0.75rem',
      fontFamily: 'Pretendard',
      fontSize: '0.75rem',
      fontWeight: '400',
    }),
    medium: css({
      padding: '0.75rem 1rem',
      borderRadius: '1rem',
      fontFamily: 'Pretendard',
      fontSize: '1rem',
      fontWeight: '700',
    }),
    large: css({
      padding: '1rem 1.5rem',
      borderRadius: '1.25rem',
      fontFamily: 'Pretendard',
      fontSize: '1.25rem',
      fontWeight: '700',
    }),
  };

  return style[size];
};

const getButtonVariantsStyle = (variants: ButtonVariants, theme: Theme) => {
  const style = {
    primary: css({
      backgroundColor: theme.colors.primary,
      color: theme.colors.onPrimary,

      '&:hover:not(:disabled)': {
        backgroundColor: setLighter(theme.colors.primary, 0.15),
      },
      '&:active:not(:disabled)': {
        backgroundColor: setDarker(theme.colors.primary, 0.15),
      },
    }),
    secondary: css({
      backgroundColor: theme.colors.secondary,
      color: theme.colors.onSecondary,

      '&:hover:not(:disabled)': {
        backgroundColor: setLighter(theme.colors.secondary, 0.15),
      },
      '&:active:not(:disabled)': {
        backgroundColor: setDarker(theme.colors.secondary, 0.15),
      },
    }),
    tertiary: css({
      backgroundColor: theme.colors.tertiary,
      color: theme.colors.onTertiary,

      '&:hover:not(:disabled)': {
        backgroundColor: setLighter(theme.colors.tertiary, 0.15),
      },
      '&:active:not(:disabled)': {
        backgroundColor: setDarker(theme.colors.tertiary, 0.15),
      },
    }),
    destructive: css({
      backgroundColor: theme.colors.error,
      color: theme.colors.onPrimary,

      '&:hover:not(:disabled)': {
        backgroundColor: setLighter(theme.colors.error, 0.15),
      },
      '&:active:not(:disabled)': {
        backgroundColor: setDarker(theme.colors.error, 0.15),
      },
    }),
  };

  return style[variants];
};
