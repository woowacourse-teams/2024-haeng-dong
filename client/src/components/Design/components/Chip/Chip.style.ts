import {ColorKeys} from '@components/Design/token/colors';
import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

interface ChipStyleProps {
  theme: Theme;
  color: ColorKeys;
}

export const chipStyle = ({theme, color}: ChipStyleProps) =>
  css({
    display: 'flex',
    padding: '0.125rem 0.5rem ',
    borderRadius: '0.5rem',
    color: `${theme.colors[color]}`,
    boxSizing: 'border-box',
    outline: 'none',
    boxShadow: `inset 0 0 0 1px ${theme.colors[color]}`,
  });
