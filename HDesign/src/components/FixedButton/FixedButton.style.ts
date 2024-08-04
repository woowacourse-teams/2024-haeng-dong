import {css} from '@emotion/react';

import {ButtonVariants} from '@components/Button/Button.type';
import {FixedButtonStyleProps} from '@components/FixedButton/FixedButton.type';

import {Theme} from '@theme/theme.type';

import {setDarker, setLighter} from '@utils/colors';

export const fixedButtonContainerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    position: 'fixed',
    maxWidth: '768px',
    inset: 'auto 0 0',
    margin: '0 auto',
    backgroundColor: theme.colors.white,
    boxSizing: 'border-box',
  });

export const buttonContainerStyle = css({
  display: 'flex',
  gap: '1rem',
  margin: '1rem 1rem 2rem 1rem',
  width: '100%',
});

export const deleteButtonStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    padding: '0.875rem 1rem',
    borderRadius: '1.25rem',
    backgroundColor: theme.colors.error,
    color: theme.colors.white,

    fontFamily: 'Pretendard',
    fontSize: '1.25rem',
    fontWeight: '700',
    lineHeight: '1',

    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',

    '&:hover:not(:disabled)': {
      backgroundColor: setLighter(theme.colors.error, 0.15),
    },
    '&:active:not(:disabled)': {
      backgroundColor: setDarker(theme.colors.error, 0.15),
    },
  });

export const fixedButtonStyle = (props: Required<FixedButtonStyleProps>) => {
  return [getFixedButtonDefaultStyle(props.theme), getFixedButtonVariantsStyle(props.variants, props.theme)];
};

const getFixedButtonDefaultStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 1.5rem',
    borderRadius: '1.25rem',
    width: '100%',

    fontFamily: 'Pretendard',
    fontSize: '1.25rem',
    fontWeight: '700',
    lineHeight: '1',

    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',

    '&:disabled': {
      backgroundColor: theme.colors.tertiary,
      color: theme.colors.onPrimary,
      cursor: 'default',
    },
  });

const getFixedButtonVariantsStyle = (variants: ButtonVariants, theme: Theme) => {
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
