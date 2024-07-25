import {css} from '@emotion/react';

import {ButtonVariants} from '@components/Button/Button.type';
import {FixedButtonStyleProps} from '@components/FixedButton/FixedButton.type';

import {Theme} from '@theme/theme.type';

export const fixedButtonContainerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    position: 'absolute',

    inset: 'auto 0 0',
    backgroundColor: theme.colors.white,
    boxSizing: 'border-box',
  });

export const fixedButtonStyle = (props: Required<FixedButtonStyleProps>) => {
  return [getFixedButtonDefaultStyle(props.theme), getFixedButtonVariantsStyle(props.variants, props.theme)];
};

const getFixedButtonDefaultStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 1.5rem',
    borderRadius: '1.25rem',
    margin: '1.5rem 1rem 3rem 1rem',
    width: '100%',

    fontFamily: 'Pretendard',
    fontSize: '1.25rem',
    fontWeight: '700',
    lineHeight: '1',

    '&:disabled': {
      backgroundColor: theme.colors.tertiary,
      color: theme.colors.onPrimary,
    },
  });

const getFixedButtonVariantsStyle = (variants: ButtonVariants, theme: Theme) => {
  const style = {
    primary: css({
      backgroundColor: theme.colors.primary,
      color: theme.colors.onPrimary,
    }),
    secondary: css({
      backgroundColor: theme.colors.secondary,
      color: theme.colors.onSecondary,
    }),
    tertiary: css({
      backgroundColor: theme.colors.tertiary,
      color: theme.colors.onTertiary,
    }),
  };

  return style[variants];
};
