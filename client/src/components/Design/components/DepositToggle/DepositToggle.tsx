/** @jsxImportSource @emotion/react */

import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';

import {DepositToggleProps} from './DepositToggle.type';
import {depositToggleStyle} from './DepositToggle.style';

export const DepositToggle: React.FC<DepositToggleProps> = ({isDeposit = false, onToggle}: DepositToggleProps) => {
  const {theme} = useTheme();

  return (
    <div css={depositToggleStyle(theme)} onClick={onToggle} role="button">
      <Text size="caption" className={`${isDeposit && 'on-toggle'} completed`}>
        입금 완료
      </Text>
      <Text size="caption" className={`${isDeposit || 'on-toggle'} not-completed`}>
        미입금
      </Text>
    </div>
  );
};
