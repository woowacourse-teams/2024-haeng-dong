import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

import {DepositCheckStyleProps} from './DepositCheck.type';

export const DepositCheckStyle = ({theme, isCheck}: WithTheme<DepositCheckStyleProps>) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.125rem',
    border: `1px solid ${isCheck ? theme.colors.primary : theme.colors.gray}`,
    borderRadius: '0.5rem',
    padding: '0.25rem 0.375rem',
    height: '1.25rem',

    '.deposit-check-text': {
      color: isCheck ? theme.colors.primary : theme.colors.gray,
      paddingTop: '0.0625rem',
    },
  });
