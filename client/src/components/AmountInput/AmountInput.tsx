/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import {Text, useTheme} from '@components/Design';

interface Props {
  value: string;
  onClick?: () => void;
  underlined?: boolean;
  activated?: boolean;
}

const AmountInput = ({value, onClick, underlined, activated}: Props) => {
  const {theme} = useTheme();
  return (
    <div
      css={css`
        display: flex;
        /* height: 4.5rem; */
        justify-content: end;
        align-items: end;
        gap: 0.5rem;
        transition: 0.2s ease-in-out;
        ${underlined &&
        css`
          border-bottom: 1px solid ${activated ? theme.colors.primary : theme.colors.gray};
        `}
      `}
      onClick={onClick}
    >
      <Text size="head" textColor={value !== '' && value !== '0' ? 'black' : 'gray'}>
        {value === '' ? '0' : value}
      </Text>
      <Text
        textColor="gray"
        size="body"
        css={css`
          margin-bottom: 0.75rem;
        `}
      >
        원
      </Text>
    </div>
  );
};

export default AmountInput;
