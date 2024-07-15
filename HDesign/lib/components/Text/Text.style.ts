import {css} from '@emotion/react';

import type {TextProps} from './Text';

// TODO: (@todari) themeProvider 이용하도록 변경
import TYPOGRAPHY from '../../token/typography';

export const getSizeStyling = (size: Required<TextProps>['size']) => {
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
  console.log(style[size]);
  return style[size];
};
