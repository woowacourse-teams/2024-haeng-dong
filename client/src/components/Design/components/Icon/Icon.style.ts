import {css} from '@emotion/react';

import {ColorKeys} from '@token/colors';

import {IconColor, IconStylePropsWithTheme, IconType} from './Icon.type';

const ICON_DEFAULT_COLOR: Record<IconType, IconColor> = {
  inputDelete: 'gray',
  buljusa: 'gray',
  rightChevron: 'gray',
  search: 'gray',
  confirm: 'complete',
  error: 'warn',
  trash: 'white',
  trashMini: 'onTertiary',
  check: 'primary',
  x: 'gray',
  pencilMini: 'gray',
  toss: 'white',
  meatballs: 'black',
  editPencil: 'gray',
  heundeut: 'gray',
  photoButton: 'white',
  chevronDown: 'tertiary',
};

export const iconStyle = ({iconType, theme, iconColor}: IconStylePropsWithTheme) => {
  return [
    css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    getIconColor({iconType, theme, iconColor}),
  ];
};

const getIconColor = ({iconType, theme, iconColor}: IconStylePropsWithTheme) => {
  if (iconColor) {
    return css({
      color: theme.colors[iconColor as ColorKeys],
    });
  } else {
    return css({color: theme.colors[ICON_DEFAULT_COLOR[iconType]]});
  }
};
