import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

interface CheckboxStyleProps {
  isChecked: boolean;
}

export const checkboxStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
  });

export const inputGroupStyle = ({theme, isChecked}: WithTheme<CheckboxStyleProps>) =>
  css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    '.check-icon': {
      position: 'absolute',
    },

    '.checkbox-input': {
      width: '1.375rem',
      height: '1.375rem',
      border: '1px solid',
      borderRadius: '0.5rem',
      borderColor: isChecked ? theme.colors.primary : theme.colors.tertiary,
      backgroundColor: isChecked ? theme.colors.primary : theme.colors.white,
    },
  });
