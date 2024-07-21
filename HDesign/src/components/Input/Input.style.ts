import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';
import {InputType} from './Input.type';

const inputBoxBackgroundColorByInputType = (theme: Theme, inputType: InputType = 'input') => {
  switch (inputType) {
    case 'input':
      return theme.colors.lightGrayContainer;

    case 'search':
      return theme.colors.white;

    default:
      return theme.colors.lightGrayContainer;
  }
};

export const inputBoxStyle = (theme: Theme, inputType: InputType = 'input') =>
  css({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    borderRadius: '1rem',
    backgroundColor: inputBoxBackgroundColorByInputType(theme, inputType),
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
