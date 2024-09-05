import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

import {InputType} from './Input.type';

const getBackgroundColorStyle = (theme: Theme, inputType: InputType = 'input') => {
  switch (inputType) {
    case 'input':
      return theme.colors.lightGrayContainer;

    case 'search':
      return theme.colors.white;

    default:
      return theme.colors.lightGrayContainer;
  }
};

const getBorderStyle = (isFocus: boolean, theme: Theme, isError?: boolean) =>
  isError ? `0 0 0 1px ${theme.colors.error} inset` : isFocus ? `0 0 0 1px ${theme.colors.primary} inset` : 'none';

export const inputBoxStyle = (
  theme: Theme,
  inputType: InputType = 'input',
  isFocus: boolean,
  isError: boolean | undefined,
) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '1rem',
    backgroundColor: getBackgroundColorStyle(theme, inputType),

    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',

    boxSizing: 'border-box',
    boxShadow: getBorderStyle(isFocus, theme, isError),
  });

export const inputStyle = (theme: Theme) =>
  css(
    {
      display: 'flex',
      width: '100%',
      color: theme.colors.black,

      '&:placeholder': {
        color: theme.colors.gray,
      },
    },
    theme.typography.body,
  );
