import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

import {DepositToggleStyleProps} from './DepositToggle.type';

export const depositToggleStyle = ({theme, isDeposit}: WithTheme<DepositToggleStyleProps>) =>
  css({
    display: `flex`,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0.25rem',
    borderRadius: '0.75rem',
    backgroundColor: theme.colors.tertiary,
    cursor: 'pointer',
    alignItems: 'center',

    '.deposit-text': {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '0.5rem',
      padding: '0 0.25rem',
      zIndex: '10',
      height: '15px',
    },

    '.toggle-background': {
      position: 'fixed',
      width: isDeposit ? '30px' : '38px',
      height: '17px',
      borderRadius: '0.5rem',
      backgroundColor: theme.colors.white,

      transition: '0.2s',
      transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',

      transform: !isDeposit ? 'translateX(0.9rem)' : 'translateX(-1.2rem)',
    },
  });
