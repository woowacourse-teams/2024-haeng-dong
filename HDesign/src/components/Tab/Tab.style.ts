import {Theme} from '@/theme/theme.type';
import {css} from '@emotion/react';

export const tabStyle = css({
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
});

export const tabListStyle = (theme: Theme) =>
  css({
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: '0.5rem',

    backgroundColor: theme.colors.white,

    cursor: 'pointer',

    '&::after': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: 1,

      width: '100%',
      height: '0.0625rem',

      backgroundColor: theme.colors.gray,

      content: '""',
    },
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
    zIndex: 2,

    width: `calc(100% / ${tabLength})`,
    height: '0.125rem',

    backgroundColor: theme.colors.onSecondary,
    transition: 'left 0.3s',
  });
