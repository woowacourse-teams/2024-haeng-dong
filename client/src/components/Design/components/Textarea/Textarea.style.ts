import {css} from '@emotion/react';

import {WithTheme} from '@components/Design/type/withTheme';

import {inputBoxAnimationStyle} from '../Input/Input.style';

interface Props {
  isFocus: boolean;
}

export const textareaStyle = ({theme, isFocus}: WithTheme<Props>) =>
  css(
    {
      backgroundColor: theme.colors.lightGrayContainer,
      border: '1px solid',
      borderColor: isFocus ? theme.colors.primary : theme.colors.lightGrayContainer,
      borderRadius: '1rem',
      padding: '12px',
      overflowWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      color: theme.colors.onTertiary,

      width: '100%',
      height: '100%',
      '::placeholder': {
        color: theme.colors.gray,
      },
    },
    theme.typography.body,
    inputBoxAnimationStyle(),
  );
