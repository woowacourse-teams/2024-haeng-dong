import {css} from '@emotion/react';
import {Theme} from '@theme/theme.type';

export const dimmedLayerStyle = (theme: Theme) =>
  css({
    // TODO: (@todari) zindex foundation
    position: 'fixed',
    zIndex: '30',
    inset: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.colors.black,
    opacity: '0.48',
  });

export const bottomSheetContainerStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    zIndex: '50',
    inset: 'auto 0 0 0',
    width: '100%',
    height: '80%',
    borderRadius: '1.5rem 1.5rem 0 0',
    backgroundColor: theme.colors.white,
  });

export const indicatorStyle = (theme: Theme) =>
  css({
    display: 'flex',
    margin: '0.5rem 0',
    width: '5rem',
    height: '0.25rem',
    borderRadius: '0.125rem',
    backgroundColor: theme.colors.gray,
  });
