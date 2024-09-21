import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

import {DepositToggleStyleProps} from './DepositToggle.type';

export const depositToggleStyle = ({theme, isDeposit}: WithTheme<DepositToggleStyleProps>) =>
  css({
    display: `flex`,
    flexDirection: 'column',
    padding: '0.25rem',
    borderRadius: '0.75rem',
    backgroundColor: theme.colors.tertiary,
    cursor: 'pointer',
    width: '4rem',

    '.deposit-text': {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '0.5rem',
      padding: ' 0.125rem 0 0 0',
      zIndex: '10',
    },

    '.toggle-background': {
      position: 'fixed',
      width: '56px',
      height: '20px',
      borderRadius: '0.5rem',
      backgroundColor: theme.colors.white,

      transition: '0.2s',
      transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',

      transform: !isDeposit ? 'translateY(1.25rem)' : '',
    },
  });
