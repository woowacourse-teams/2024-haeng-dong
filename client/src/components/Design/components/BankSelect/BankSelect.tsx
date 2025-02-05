/** @jsxImportSource @emotion/react */

import {BankName} from 'types/serviceType';

import BANKS from '@constants/bank';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {bankSelectStyle} from './BankSelect.style';
import {BankSpriteInitializer} from './BankSpriteInitializer';
import {BankIcon} from './BankIcon';

type BankSelectProps = {
  onSelect: (name: BankName) => void;
};

const BankSelect = ({onSelect}: BankSelectProps) => {
  return (
    <>
      <BankSpriteInitializer />
      <div css={bankSelectStyle}>
        {BANKS.map(({name, displayName, iconId}) => (
          <button onClick={() => onSelect(name)} key={name}>
            <Flex flexDirection="column" alignItems="center" gap="0.5rem" width="100%">
              <BankIcon iconId={iconId} />
              <Text size="body" textColor="black" style={{textAlign: 'center'}}>
                {displayName}
              </Text>
            </Flex>
          </button>
        ))}
      </div>
    </>
  );
};

export default BankSelect;
