import {css} from '@emotion/react';

import {TextSize} from '@components/Text/Text.type';
import {WithTheme} from '@type/withTheme';

import TYPOGRAPHY from '@token/typography';

type UnderlineProps = {
  hasFocus: boolean;
  hasError: boolean;
};

type InputSizeStyleProps = {
  textSize: TextSize;
};

type InputBaseStyleProps = {};

type InputStyleProps = InputBaseStyleProps & InputSizeStyleProps;

export const inputWrapperStyle = css({
  display: 'inline-block',
});

export const inputStyle = ({theme, textSize}: WithTheme<InputStyleProps>) => [
  inputSizeStyle({textSize}),
  inputBaseStyle({theme}),
];

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

const inputBaseStyle = ({theme}: WithTheme<InputBaseStyleProps>) =>
  css({
    border: 'none',
    outline: 'none',
    paddingBottom: '0.125rem',

    color: theme.colors.black,

    '&:placeholder': {
      color: theme.colors.darkGray,
    },
  });

export const editingContainerStyle = css({
  opacity: 0,
  whiteSpace: 'pre',
  position: 'absolute',
  pointerEvents: 'none',
  padding: 0,
  margin: 0,
});

export const isFixedIconStyle = ({theme}: WithTheme) =>
  css({
    color: theme.colors.error,
    paddingRight: '0.25rem',
  });

export const underlineStyle = ({theme, hasFocus, hasError}: WithTheme<UnderlineProps>) =>
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
