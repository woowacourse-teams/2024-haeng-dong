import type {TextStylePropsWithTheme} from './Text.type';

import {css} from '@emotion/react';

// TODO: (@todari) themeProvider 이용하도록 변경
import TYPOGRAPHY from '@token/typography';

export const getSizeStyling = ({size, textColor, theme, responsive}: Required<TextStylePropsWithTheme>) => {
  const getResponsiveStyle = (baseStyle: any) => {
    if (responsive) {
      return css`
        ${baseStyle}
        @media (min-width: 1024px) {
          font-size: calc(${baseStyle.fontSize} * 1.2);
        }
        @media (min-width: 1600px) {
          font-size: calc(${baseStyle.fontSize} * 1.5);
        }
      `;
    }
    return css(baseStyle);
  };

  const style = {
    head: getResponsiveStyle(TYPOGRAPHY.head),
    title: getResponsiveStyle(TYPOGRAPHY.title),
    subTitle: getResponsiveStyle(TYPOGRAPHY.subTitle),
    bodyBold: getResponsiveStyle(TYPOGRAPHY.bodyBold),
    body: getResponsiveStyle(TYPOGRAPHY.body),
    smallBodyBold: getResponsiveStyle(TYPOGRAPHY.smallBodyBold),
    smallBody: getResponsiveStyle(TYPOGRAPHY.smallBody),
    captionBold: getResponsiveStyle(TYPOGRAPHY.captionBold),
    caption: getResponsiveStyle(TYPOGRAPHY.caption),
    tiny: getResponsiveStyle(TYPOGRAPHY.tiny),
  };

  const colorStyle = css({color: theme.colors[textColor]});

  const baseStyle = css({
    whiteSpace: 'pre-line',
    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
  });

  return [style[size], colorStyle, baseStyle];
};
