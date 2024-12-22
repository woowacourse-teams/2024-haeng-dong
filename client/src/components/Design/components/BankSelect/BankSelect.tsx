/** @jsxImportSource @emotion/react */
import {BankName} from 'types/serviceType';

import BANKS from '@constants/bank';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {bankSelectStyle, iconStyle} from './BankSelect.style';

type BankSelectProps = {
  onSelect: (name: BankName) => void;
};

const BankSelect = ({onSelect}: BankSelectProps) => {
  return (
    <div css={bankSelectStyle}>
      {BANKS.map(({name, displayName, iconPosition}) => (
        <button onClick={() => onSelect(name)} key={name}>
          <Flex flexDirection="column" alignItems="center" gap="0.5rem" width="100%">
            <div css={iconStyle(iconPosition)} />
            <Text size="body" textColor="black" style={{textAlign: 'center'}}>
              {displayName}
            </Text>
          </Flex>
        </button>
      ))}
    </div>
  );
};

export default BankSelect;
