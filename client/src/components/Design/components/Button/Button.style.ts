import {css} from '@emotion/react';

import {setDarker, setEmphasize, setLighter} from '@HDutils/colors';
import {Theme} from '@theme/theme.type';

import {ButtonStyleProps, ButtonSize, ButtonVariants} from './Button.type';

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
    alignItems: 'center',
    lineHeight: '1',
    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
    whiteSpace: 'nowrap',

    '&:disabled': {
      backgroundColor: theme.colors.grayContainer,
      color: theme.colors.onPrimary,
      cursor: 'default',
    },
  });

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

const getButtonSizeStyle = (size: ButtonSize) => {
  const style = {
    small: css({
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      fontFamily: 'Pretendard',
      fontSize: '0.75rem',
      fontWeight: '400',
    }),
    medium: css({
      padding: '0.75rem 1rem',
      borderRadius: '0.75rem',
      fontFamily: 'Pretendard',
      fontSize: '1rem',
      fontWeight: '700',
    }),
    semiLarge: css({
      padding: '0.75rem 1rem',
      borderRadius: '1rem',
      fontFamily: 'Pretendard',
      fontSize: '1rem',
      fontWeight: '700',
      height: '3rem',
    }),
    large: css({
      padding: '1rem 1.5rem',
      borderRadius: '1rem',
      fontFamily: 'Pretendard',
      fontSize: '1.25rem',
      fontWeight: '700',
    }),
  };

  return style[size];
};

const getButtonVariantsStyle = (variants: ButtonVariants, theme: Theme) => {
  const style = {
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
    loading: [
      css({
        backgroundColor: theme.colors.tertiary,
        color: theme.colors.onTertiary,
      }),
      getHoverAndActiveBackground(theme.colors.tertiary),
    ],
    kakao: [
      css({
        backgroundColor: theme.colors.kakao,
        color: theme.colors.onKakao,
      }),
    ],
  };

  return style[variants];
};
