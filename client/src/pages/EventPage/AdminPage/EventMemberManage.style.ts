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
  });

export const eventMember = () =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0',
    width: 'inherit',
  });

export const memberEditInput = (theme: Theme) =>
  css({
    input: {
      width: '100%',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.colors.tertiary}`,
    width: '100%',
    marginRight: '3.375rem',
    ...TYPOGRAPHY.bodyBold,
  });
