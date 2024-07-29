import {css} from '@emotion/react';

import {Theme} from '@/theme/theme.type';
import {ColorKeys} from '@/token/colors';

export const dragHandleItemStyle = (theme: Theme, hasDragHandle: boolean, backgroundColor: ColorKeys) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: hasDragHandle ? '0.5rem 0.5rem 0.5rem 0.25rem' : '0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: theme.colors[backgroundColor],
  });

export const prefixStyle = css({
  display: 'flex',
  gap: '0.25rem',
  width: '100%',
});
