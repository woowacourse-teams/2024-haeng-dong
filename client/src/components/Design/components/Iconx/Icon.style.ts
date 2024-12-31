import {css} from '@emotion/react';

import {ColorKeys} from '@token/colors';

import {IconColor, IconStylePropsWithTheme, IconType} from './Icon.type';

const ICON_DEFAULT_COLOR: Record<IconType, IconColor> = {
  inputDelete: 'gray',
  rightChevron: 'gray',
  search: 'gray',
  confirm: 'complete',
  error: 'warn',
  trash: 'white',
  trashMini: 'onTertiary',
  check: 'primary',
  x: 'gray',
  pencilMini: 'gray',
  meatballs: 'black',
  editPencil: 'gray',
  heundeut: 'gray',
  photoButton: 'white',
  chevronDown: 'tertiary',
  kakao: 'onKakao',
};

export const iconStyle = ({iconType, theme, iconColor, size, width, height}: IconStylePropsWithTheme) => {
  return [
    css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    getIconColor({iconType, theme, iconColor}),
    getIconSize({size, width, height}),
  ];
};

const getIconColor = ({iconType, theme, iconColor}: IconStylePropsWithTheme) => {
  if (iconColor) {
    return css({
      svg: {
        path: {
          stroke: theme.colors[iconColor as ColorKeys],
        },
      },
    });
  } else {
    return css({color: theme.colors[ICON_DEFAULT_COLOR[iconType]]});
  }
};

const getIconSize = ({size, width, height}: Omit<IconStylePropsWithTheme, 'theme' | 'iconType'>) => {
  return css({
    svg: {
      width: size ?? width,
      height: size ?? height,
      viewBox: size ? `0 0 ${size} ${size}` : width && height ? `0 0 ${width} ${height}` : '',
    },
  });
};
