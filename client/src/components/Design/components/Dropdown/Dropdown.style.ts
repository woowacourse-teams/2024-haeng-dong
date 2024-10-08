import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

import {FlexProps} from '../Flex/Flex.type';

export const dropdownBaseStyle = css({
  position: 'relative',

  WebkitTapHighlightColor: 'transparent',
});

export const dropdownStyle = (theme: Theme): FlexProps => {
  return {
    flexDirection: 'column',
    width: '12.5rem',
    padding: '0.5rem',
    paddingInline: '0.5rem',
    gap: '0.25rem',
    backgroundColor: 'white',

    otherStyle: {
      position: 'absolute',
      top: '2rem',
      right: '-1rem',
      borderRadius: '0.75rem',
      boxShadow: '2px 4px 16px 0 rgba(0, 0, 0, 0.08)',
      zIndex: theme.zIndex.dropdownList,
    },
  };
};

export const dropdownButtonBaseStyle = (theme: Theme): FlexProps => {
  return {
    flexDirection: 'column',
    width: '12.5rem',
    padding: '0.5rem',
    paddingInline: '0.5rem',
    gap: '0.25rem',
    backgroundColor: 'white',

    otherStyle: {
      position: 'absolute',
      top: '2.5rem',
      right: '-0.5rem',
      borderRadius: '0.75rem',
      boxShadow: '2px 4px 16px 0 rgba(0, 0, 0, 0.08)',
      zIndex: theme.zIndex.dropdownList,
    },
  };
};

export const dropdownButtonStyle = (theme: Theme) =>
  css({
    height: '2rem',
    padding: '0.25rem 0.5rem',

    ':hover': {
      borderRadius: '0.625rem',
      backgroundColor: theme.colors.grayContainer,
    },
  });
