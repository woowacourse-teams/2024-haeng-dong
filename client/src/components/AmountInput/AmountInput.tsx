/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Text} from '@components/Design';

interface Props {
  value: string;
}

const AmountInput = ({value}: Props) => {
  return (
    <div
      css={css`
        display: flex;
        /* height: 4.5rem; */
        justify-content: end;
        align-items: end;
        gap: 0.5rem;
      `}
    >
      <Text size="head" textColor={value ? 'black' : 'gray'}>
        {value ? value : '0'}
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
