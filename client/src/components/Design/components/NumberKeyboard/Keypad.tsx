/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import {setDarker, setLighter} from '@components/Design/utils/colors';

import {Text, useTheme} from '@components/Design';

interface Props {
  value: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Keypad({value, label, onClick, disabled = false}: Props) {
  const {theme} = useTheme();
  return (
    <button
      aria-label={label}
      css={css`
        display: flex;
        justify-content: center;
        width: 100%;
        height: 3rem;
        border-radius: 1rem;
        transition: 0.2s;
        transition-timing-function: cubic-bezier(0.7, 0.62, 0.62, 1.16);

        :not(:disabled) {
          &:hover {
            background-color: ${setLighter(theme.colors.lightGrayContainer, 0.15)};
          }
          &:active {
            background-color: ${setDarker(theme.colors.lightGrayContainer, 0.15)};
          }
        }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <Text size="title">{value}</Text>
    </button>
  );
}
