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
    width: '4.75rem',
    height: '1.4375rem',

    '.deposit-text': {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '0.5rem',
      padding: '0 0.25rem',
      zIndex: theme.zIndex.depositToggleMovingAnimation,
      height: '15px',
      width: '34px',
      paddingTop: '0.05rem',
    },

    '.toggle-background': {
      position: 'absolute',
      width: '34px',
      height: '15px',
      borderRadius: '0.5rem',
      backgroundColor: theme.colors.white,

      transition: '0.2s',
      transitionTimingFunction: 'cubic-bezier(0.7, 0.62, 0.62, 1.16)',

      transform: !isDeposit ? 'translateX(1.07rem)' : 'translateX(-1.06rem)',
    },
  });
