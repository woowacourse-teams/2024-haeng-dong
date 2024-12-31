/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design';

import Text from '../Text/Text';

import {DepositCheckStyle} from './DepositCheck.style';
import {DepositCheckProps} from './DepositCheck.type';
import {IconCheck} from '../Icons/Icons/IconCheck';

const DepositCheck: React.FC<DepositCheckProps> = ({isDeposited = false}: DepositCheckProps) => {
  const {theme} = useTheme();
  return (
    <div css={DepositCheckStyle({theme, isDeposited})}>
      <Text size="tiny" className="deposit-check-text">
        입금
      </Text>
      <IconCheck color={isDeposited ? 'primary' : 'secondary'} />
      {/* <Icon iconType={isDeposited ? 'check' : 'x'} size={40} width={40} height={40}></Icon> */}
    </div>
  );
};
export default DepositCheck;
