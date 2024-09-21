import type {TextStylePropsWithTheme} from './Text.type';

import {css} from '@emotion/react';

// TODO: (@todari) themeProvider 이용하도록 변경
import TYPOGRAPHY from '@token/typography';

export const getSizeStyling = ({size, textColor, theme}: Required<TextStylePropsWithTheme>) => {
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

  const colorStyle = css({color: theme.colors[textColor]});

  const baseStyle = css({
    whiteSpace: 'pre-line',
    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
  });

  return [style[size], colorStyle, baseStyle];
};
