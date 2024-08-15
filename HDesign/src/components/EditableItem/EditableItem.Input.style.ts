import {TextSize} from '@components/Text/Text.type';
import {css} from '@emotion/react';
import {Theme} from '@theme/theme.type';
import TYPOGRAPHY from '@token/typography';

interface InputWrapperStyleProps {
  theme: Theme;
  hasFocus: boolean;
  hasError: boolean;
}

interface InputStyleProps {
  theme: Theme;
  textSize: TextSize;
}

interface InputSizeStyleProps {
  textSize: TextSize;
}

interface InputBaseStyleProps {
  theme: Theme;
}

export const inputWrapperStyle = ({theme, hasFocus, hasError}: InputWrapperStyleProps) =>
  css({
    position: 'relative',
    display: 'inline-block',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '0.125rem',
      backgroundColor: hasFocus ? theme.colors.primary : hasError ? theme.colors.error : 'transparent',
      transition: 'background-color 0.2s',
      transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
    },
  });

export const inputStyle = ({theme, textSize}: InputStyleProps) => [inputSizeStyle({textSize}), inputBaseStyle({theme})];

const inputSizeStyle = ({textSize}: InputSizeStyleProps) => {
  const style = {
    head: css(TYPOGRAPHY.head),
    title: css(TYPOGRAPHY.title),
    subTitle: css(TYPOGRAPHY.subTitle),
    bodyBold: css(TYPOGRAPHY.bodyBold),
    body: css(TYPOGRAPHY.body),
    smallBodyBold: css(TYPOGRAPHY.smallBodyBold),
    smallBody: css(TYPOGRAPHY.smallBody),
    captionBold: css(TYPOGRAPHY.captionBold),
    caption: css(TYPOGRAPHY.caption),
    tiny: css(TYPOGRAPHY.tiny),
  };

  return [style[textSize]];
};

const inputBaseStyle = ({theme}: InputBaseStyleProps) =>
  css({
    border: 'none',
    outline: 'none',
    paddingBottom: '0.125rem',

    color: theme.colors.black,
    '&:placeholder': {
      color: theme.colors.gray,
    },
  });
