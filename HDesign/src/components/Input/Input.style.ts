import {css} from '@emotion/react';
import {Theme} from '@theme/theme.type';

export const inputBoxStyle = (theme: Theme) =>
  css({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    borderRadius: '1rem',
    backgroundColor: theme.colors.grayContainer,
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
