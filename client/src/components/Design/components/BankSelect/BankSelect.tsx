/** @jsxImportSource @emotion/react */
import BANKS from '@constants/bank';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {bankSelectStyle, iconStyle} from './BankSelect.style';

type BankSelectProps = {
  onSelect: (name: string) => void;
};

const BankSelect = ({onSelect}: BankSelectProps) => {
  return (
    <div css={bankSelectStyle}>
      {BANKS.map(({name, iconPosition}) => (
        <button onClick={() => onSelect(name)} key={name}>
          <Flex flexDirection="column" alignItems="center" gap="0.5rem" width="100%">
            <div css={iconStyle(iconPosition)} />
            <Text size="body" textColor="black" style={{textAlign: 'center'}}>
              {name}
            </Text>
          </Flex>
        </button>
      ))}
    </div>
  );
};

export default BankSelect;
