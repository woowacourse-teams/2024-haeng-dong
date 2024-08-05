import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';
import {ColorKeys} from '@token/colors';

export const containerStyle = (theme: Theme, backgroundColor: ColorKeys) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.75rem',
    backgroundColor: theme.colors[backgroundColor],
  });

export const topLeftStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
  });

//TODO: (@todari) : 추후 클릭 기능을 넣었을 때 underline
export const topRightStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
    // textDecoration: 'underline',
  });

export const bottomLeftTextStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
  });

export const bottomRightTextStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
  });
