import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

import {ColorKeys} from '@token/colors';

export const editableItemStyle = (theme: Theme, backgroundColor: ColorKeys) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: theme.colors[backgroundColor],
  });
