import {css} from '@emotion/react';
import {Theme} from 'lib/theme/theme.type';

export const titleContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  padding: '0 1rem',
});

export const titleStyle = (theme: Theme) =>
  css({
    color: theme.colors.black,
  });

export const descriptionStyle = (theme: Theme) =>
  css({
    color: theme.colors.darkGray,
  });
