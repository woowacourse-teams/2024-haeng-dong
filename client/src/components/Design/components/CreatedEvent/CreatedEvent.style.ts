import {css, keyframes} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

import {RippleAnimation} from './CreatedEvent';

export const inProgressCheckStyle = ({inProgress, theme}: WithTheme<{inProgress: boolean}>) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.125rem',
    border: `1px solid ${inProgress ? theme.colors.primary : theme.colors.gray}`,
    borderRadius: '0.5rem',
    padding: '0.25rem 0.375rem',
    height: '1.25rem',

    '.in-progress-check-text': {
      color: inProgress ? theme.colors.primary : theme.colors.gray,
      paddingTop: '0.0625rem',
    },
  });

const rippleAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
`;

export const touchAreaStyle = ({theme}: WithTheme) =>
  css({
    position: 'relative',
    overflow: 'hidden',

    width: '100%',
    backgroundColor: theme.colors.white,
    touchAction: 'manipulation',
  });

export const rippleDefaultStyle = ({theme, x, y, size}: WithTheme<RippleAnimation>) => {
  const remSize = size / 16;
  const remX = x / 16;
  const remY = y / 16;

  return css({
    position: 'absolute',
    top: `${remY - remSize / 2}rem`,
    left: `${remX - remSize / 2}rem`,
    width: `${remSize}rem`,
    height: `${remSize}rem`,
    background: theme.colors.grayContainer,
    borderRadius: `50%`,
    transform: 'scale(1)',
    animation: `${rippleAnimation} 0.5s ease-out forwards`,
  });
};
