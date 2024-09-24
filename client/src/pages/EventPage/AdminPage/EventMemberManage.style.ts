import {css} from '@emotion/react';

import {Theme} from '@components/Design/theme/theme.type';
import TYPOGRAPHY from '@components/Design/token/typography';

export const eventMemberMangeStyle = () =>
  css({
    padding: '0 1rem',
  });

export const memberList = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0 0.5rem',
    marginTop: '1rem',
    height: 'inherit',
    marginBottom: '100px',
  });

export const noneReports = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'inherit',
  });

export const eventMember = () =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0',
    width: 'inherit',
    justifyContent: 'space-between',
  });

export const memberEditInput = (theme: Theme) =>
  css({
    input: {
      width: '100%',
    },
    width: '6.125rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.colors.tertiary}`,
    ...TYPOGRAPHY.bodyBold,

    '&:has(input:focus)': {
      borderBottom: `1px solid ${theme.colors.primary}`,
    },
  });
