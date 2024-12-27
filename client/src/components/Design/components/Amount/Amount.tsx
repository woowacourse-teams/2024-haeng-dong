/** @jsxImportSource @emotion/react */

import {css} from '@emotion/react';

import Flex from '../Flex/Flex';
import Text from '../Text/Text';

interface Props {
  amount: number;
}

const Amount = ({amount}: Props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.25rem;
      `}
    >
      <Text>{amount ? amount.toLocaleString('ko-kr') : 0}</Text>
      <Text size="tiny" textColor="gray">
        원
      </Text>
    </div>
  );
};

export default Amount;
