import {Theme} from '@/theme/theme.type';
import {css} from '@emotion/react';

export const billItemStyle = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0.5rem 0.5rem 0.25rem',
    borderRadius: '0.5rem',
    backgroundColor: theme.colors.lightGrayContainer,
  });

export const prefixStyle = css({
  display: 'flex',
  gap: '0.25rem',
});

export const textStyle = (theme: Theme) =>
  css({
    color: theme.colors.black,
  });
