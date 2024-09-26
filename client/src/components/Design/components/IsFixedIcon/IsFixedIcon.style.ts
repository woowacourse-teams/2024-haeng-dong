import {css} from '@emotion/react';

import {WithTheme} from '@type/withTheme';

export const isFixedIconStyle = ({theme}: WithTheme) =>
  css({
    color: theme.colors.error,
    paddingRight: '0.25rem',
  });
