import {css} from '@emotion/react';

import {ButtonVariants} from '@HDcomponents/Button/Button.type';
import {FixedButtonStyleProps} from '@HDcomponents/FixedButton/FixedButton.type';
import {Theme} from '@theme/theme.type';
import {setDarker, setLighter} from '@HDutils/colors';

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

export const deleteButtonStyle = (theme: Theme) => [
  css({
    display: 'flex',
    justifyContent: 'center',
    padding: '0.875rem 1rem',
    borderRadius: '1.25rem',
    backgroundColor: theme.colors.error,
    color: theme.colors.white,

    fontFamily: 'Pretendard',
    fontSize: '1rem',
    fontWeight: '700',
    lineHeight: '1',

    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
  }),
  getHoverAndActiveBackground(theme.colors.error),
];

export const fixedButtonStyle = (props: Required<FixedButtonStyleProps>) => {
  return [getFixedButtonDefaultStyle(props.theme), getFixedButtonVariantsStyle(props.variants, props.theme)];
};

const getFixedButtonDefaultStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 1.5rem',
    borderRadius: '1rem',
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
  };

  return style[variants];
};
