import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

interface CheckboxStyleProps {
  checked: boolean;
}

export const checkboxStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
  });

export const boxStyle = ({theme, checked}: WithTheme<CheckboxStyleProps>) =>
  css({
    width: '1.375rem',
    height: '1.375rem',
    border: '1px solid',
    borderRadius: '0.5rem',
    borderColor: checked ? theme.colors.primary : theme.colors.tertiary,
    backgroundColor: checked ? theme.colors.primary : theme.colors.white,

    transition: 'all 0.2s',
    transitionTimingFunction: 'cubic-bezier(0.7, 0, 0.3, 1)',
  });

export const invisibleInputStyle = () =>
  css({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: 0,
  });
