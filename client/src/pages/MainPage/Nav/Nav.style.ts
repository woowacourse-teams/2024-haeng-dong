import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';

export const navStyle = (theme: Theme) =>
  css({
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',

    top: '0',
    width: '100%',
    maxWidth: '768px',
    zIndex: theme.zIndex.navBackgroundColor,
    height: '4rem',
    backgroundColor: 'white',
  });

export const logoStyle = css({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});
