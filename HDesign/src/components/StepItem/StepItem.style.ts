import {Theme} from '@/theme/theme.type';
import {css} from '@emotion/react';

export const stepItemStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.75rem',
    backgroundColor: theme.colors.white,
  });

export const nameStyle = (theme: Theme) =>
  css({
    color: theme.colors.black,
  });

export const personCountStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
    textDecoration: 'underline',
  });

export const totalTitleStyle = (theme: Theme) =>
  css({
    color: theme.colors.black,
  });

export const totalAmountStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
  });
