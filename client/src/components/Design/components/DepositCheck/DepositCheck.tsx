/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';

import {DepositCheckStyle} from './DepositCheck.style';
import {DepositCheckProps} from './DepositCheck.type';

const DepositCheck: React.FC<DepositCheckProps> = ({isCheck = false}: DepositCheckProps) => {
  const {theme} = useTheme();
  return (
    <div css={DepositCheckStyle({theme, isCheck})}>
      <Text size="tiny" className="deposit-check-text">
        입금
      </Text>
      <Icon iconType={isCheck ? 'check' : 'x'}></Icon>
    </div>
  );
};
export default DepositCheck;
