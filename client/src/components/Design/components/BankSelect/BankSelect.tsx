/** @jsxImportSource @emotion/react */
import BANKS from '@constants/bank';

import Text from '../Text/Text';

import {bankButtonStyle, bankSelectStyle, iconStyle} from './BankSelect.style';

type BankSelectProps = {
  onSelect: (name: string) => void;
};

const BankSelect = ({onSelect}: BankSelectProps) => {
  return (
    <div css={bankSelectStyle}>
      {BANKS.map(({name, iconPosition}) => (
        <button css={bankButtonStyle} onClick={() => onSelect(name)} key={name}>
          <div css={iconStyle(iconPosition)} />
          <Text size="body" textColor="black" style={{textAlign: 'center'}}>
            {name}
          </Text>
        </button>
      ))}
    </div>
  );
};

export default BankSelect;
