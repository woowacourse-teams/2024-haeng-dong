/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design';

import Text from '../Text/Text';
import {IconCheck} from '../Icons/Icons/IconCheck';
import {IconX} from '../Icons/Icons/IconX';

import {depositCheckStyle} from './DepositCheck.style';
import {DepositCheckProps} from './DepositCheck.type';

const DepositCheck: React.FC<DepositCheckProps> = ({isDeposited = false}: DepositCheckProps) => {
  const {theme} = useTheme();
  return (
    <div css={depositCheckStyle({theme, isDeposited})}>
      <Text size="tiny" className="deposit-check-text">
        입금
      </Text>
      {isDeposited ? <IconCheck size={12} color="primary" /> : <IconX color="gray" />}
    </div>
  );
};
export default DepositCheck;
