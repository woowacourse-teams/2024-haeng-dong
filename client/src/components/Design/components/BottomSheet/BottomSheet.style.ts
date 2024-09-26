import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const display = (visible: boolean) =>
  css({
    visibility: visible ? 'visible' : 'hidden',
  });

export const dimmedLayerStyle = (theme: Theme, isOpened: boolean) =>
  css({
    position: 'fixed',
    zIndex: theme.zIndex.bottomSheetDimmedLayer,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '768px',
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.colors.black,
    opacity: isOpened ? '0.48' : '0',

    transition: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',
  });

export const bottomSheetContainerStyle = (theme: Theme, isOpened: boolean, isDragging: boolean, translateY: number) =>
  css({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    zIndex: theme.zIndex.bottomSheetContainer,
    inset: 'auto 0 0 50%',
    maxWidth: '768px',
    width: '100%',
    height: '80%',
    borderRadius: '1.5rem 1.5rem 0 0',
    backgroundColor: theme.colors.white,

    transform: isOpened ? `translate(-50%, ${translateY}px)` : 'translate(-50%, 100%)',
    transition: isDragging ? 'none' : 'transform 0.2s ease-in-out',
  });

export const indicatorContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  padding: '0.5rem 0',
  width: '100%',
});

export const indicatorStyle = (theme: Theme) =>
  css({
    display: 'flex',
    width: '5rem',
    height: '0.25rem',
    borderRadius: '0.125rem',
    backgroundColor: theme.colors.gray,
  });
