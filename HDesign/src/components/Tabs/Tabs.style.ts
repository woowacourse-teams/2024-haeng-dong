import {Theme} from '@/theme/theme.type';
import {css} from '@emotion/react';

export const tabListStyle = (theme: Theme) =>
  css({
    position: 'relative',

    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.colors.gray,

    backgroundColor: theme.colors.white,

    cursor: 'pointer',
  });

export const tabItemStyle = css({
  flex: 1,

  textAlign: 'center',
});

export const tabTextStyle = (theme: Theme, selected: boolean) =>
  css({
    color: selected ? theme.colors.onTertiary : theme.colors.gray,
  });

export const indicatorStyle = (theme: Theme, leftPosition: string, tabLength: number) =>
  css({
    position: 'absolute',
    left: leftPosition,
    bottom: 0,

    width: `calc(100% / ${tabLength})`,
    height: '0.125rem',

    backgroundColor: theme.colors.onSecondary,
    transition: 'left 0.3s',
  });
