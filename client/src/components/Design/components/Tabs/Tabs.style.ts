import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

export const tabListStyle = ({theme}: WithTheme) =>
  css({
    position: 'relative',

    height: '3rem',
    marginBottom: '0.5rem',

    borderRadius: '0.75rem',
    backgroundColor: theme.colors.white,

    cursor: 'pointer',

    WebkitTapHighlightColor: 'transparent',
  });

export const tabItemStyle = css({
  flex: 1,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  height: '100%',
});

type WithSelected = WithTheme & {
  selected: boolean;
};

type IndicatorType = WithTheme & {
  tabWidth: number;
  activeTabIndex: number;
};

export const tabTextStyle = ({theme, selected}: WithSelected) =>
  css({
    color: selected ? theme.colors.onTertiary : theme.colors.gray,

    zIndex: theme.zIndex.visible,
  });

export const indicatorStyle = ({theme, tabWidth, activeTabIndex}: IndicatorType) =>
  css({
    position: 'absolute',
    bottom: '0.5rem',
    left: '0.5rem',
    width: `${tabWidth}px`,
    height: 'calc(100% - 1rem)',

    borderRadius: '0.625rem',
    backgroundColor: theme.colors.tertiary,

    transform: `translateX(${tabWidth * activeTabIndex}px)`,
    transition: 'transform 0.3s ease',
    zIndex: theme.zIndex.normal,
  });
