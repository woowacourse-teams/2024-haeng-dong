import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

export const inProgressCheckStyle = ({inProgress, theme}: WithTheme<{inProgress: boolean}>) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.125rem',
    border: `1px solid ${inProgress ? theme.colors.primary : theme.colors.gray}`,
    borderRadius: '0.5rem',
    padding: '0.25rem 0.375rem',
    height: '1.25rem',

    '.in-progress-check-text': {
      color: inProgress ? theme.colors.primary : theme.colors.gray,
      paddingTop: '0.0625rem',
    },
  });

export const touchAreaStyle = css({
  position: 'relative',
  overflow: 'hidden',

  width: '100%',
});
