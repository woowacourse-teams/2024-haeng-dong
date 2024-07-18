import {Theme} from '@/theme/theme.type';
import {TextColor} from './TextButton.type';
import {css} from '@emotion/react';

interface TextButtonStyleProps {
  textColor: TextColor;
  theme: Theme;
}

export const textButtonStyle = ({textColor, theme}: TextButtonStyleProps) =>
  css({
    color: theme.colors[textColor],
  });
