/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {bankButtonStyle, isDepositedStyle} from './BankSendButton.style';

type BankSendButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  onBankButtonClick: () => void;
  isDeposited?: boolean;
};

const BankSendButton = ({onBankButtonClick, isDeposited = false, ...buttonProps}: BankSendButtonProps) => {
  const {theme} = useTheme();

  return isDeposited ? (
    <button css={isDepositedStyle(theme)} disabled {...buttonProps}>
      <Flex justifyContent="center" alignItems="center">
        <Text size="tiny" textColor="black">
          송금완료
        </Text>
      </Flex>
    </button>
  ) : (
    <button onClick={onBankButtonClick} css={bankButtonStyle(theme)} {...buttonProps}>
      <Flex justifyContent="center" alignItems="center" gap="0.125rem">
        <Text size="tiny" textColor="black">
          송금
        </Text>
        <Icon iconType="toss" />
      </Flex>
    </button>
  );
};

export default BankSendButton;
