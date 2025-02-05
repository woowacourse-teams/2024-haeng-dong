import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

import {DepositCheckStyleProps} from './DepositCheck.type';

export const depositCheckStyle = ({theme, isDeposited}: WithTheme<DepositCheckStyleProps>) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.125rem',
    border: `1px solid ${isDeposited ? theme.colors.primary : theme.colors.gray}`,
    borderRadius: '0.5rem',
    padding: '0.25rem 0.375rem',
    height: '1.25rem',
    width: 'fit-content',

    '.deposit-check-text': {
      color: isDeposited ? theme.colors.primary : theme.colors.gray,
      paddingTop: '0.0625rem',
    },
  });
