import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

import {ColorKeys} from '@token/colors';

import {IconColor, IconType} from './Icon.type';

const ICON_DEFAULT_COLOR: Record<IconType, IconColor> = {
  inputDelete: 'gray',
  buljusa: 'gray',
  rightChevron: 'gray',
  search: 'gray',
  confirm: 'complete',
  error: 'warn',
  trash: 'white',
};

export const iconStyle = (iconType: IconType, theme: Theme, iconColor?: IconColor) => {
  if (iconColor) {
    return css({
      color: theme.colors[iconColor as ColorKeys],
    });
  } else {
    return css({color: theme.colors[ICON_DEFAULT_COLOR[iconType]]});
  }
};
