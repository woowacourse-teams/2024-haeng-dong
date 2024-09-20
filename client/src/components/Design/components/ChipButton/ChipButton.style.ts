import {css} from '@emotion/react';

import {ColorKeys} from '@components/Design/token/colors';
import {Theme} from '@theme/theme.type';

interface ChipStyleProps {
  theme: Theme;
  color: ColorKeys;
}

export const chipButtonStyle = ({theme, color}: ChipStyleProps) =>
  css({
    display: 'flex',
    padding: '0.25rem 0.375rem 0.25rem 0.75rem',
    gap: '0.5rem',
    borderRadius: '1rem',
    color: `${theme.colors[color]}`,
    boxSizing: 'border-box',
    outline: 'none',
    boxShadow: `inset 0 0 0 1px ${theme.colors[color]}`,
  });
