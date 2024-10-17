/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import {setDarker, setLighter} from '@components/Design/utils/colors';

import {Text, useTheme} from '@components/Design';

type KeypadProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function Keypad({value, ...restButtonProps}: KeypadProps) {
  const {theme} = useTheme();

  return (
    <button
      {...restButtonProps}
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
    >
      <Text size="title" aria-hidden>
        {value}
      </Text>
    </button>
  );
}
