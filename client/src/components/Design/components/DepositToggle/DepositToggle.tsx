/** @jsxImportSource @emotion/react */

import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';

import {DepositToggleProps} from './DepositToggle.type';
import {depositToggleStyle} from './DepositToggle.style';

export const DepositToggle: React.FC<DepositToggleProps> = ({isDeposit = false, onToggle}: DepositToggleProps) => {
  const {theme} = useTheme();

  return (
    <div css={depositToggleStyle({theme, isDeposit})} onClick={onToggle} role="button">
      <div className="toggle-background" content="" />
      <Text size="tiny" textColor={isDeposit ? 'primary' : 'gray'} className="deposit-text">
        입금
      </Text>
      <Text size="tiny" textColor={isDeposit ? 'gray' : 'error'} className="deposit-text">
        미입금
      </Text>
    </div>
  );
};
