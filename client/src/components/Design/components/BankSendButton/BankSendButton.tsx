/** @jsxImportSource @emotion/react */
import CopyToClipboard from 'react-copy-to-clipboard';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {bankButtonStyle, isDepositedStyle} from './BankSendButton.style';

type BankSendButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  clipboardText: string;
  onBankButtonClick: () => void;
  isDeposited?: boolean;
};

const BankSendButton = ({
  clipboardText,
  onBankButtonClick,
  isDeposited = false,
  ...buttonProps
}: BankSendButtonProps) => {
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
    <CopyToClipboard text={clipboardText} onCopy={onBankButtonClick}>
      <button css={bankButtonStyle(theme)} {...buttonProps}>
        <Flex justifyContent="center" alignItems="center" gap="0.125rem">
          <Text size="tiny" textColor="black">
            송금
          </Text>
          <Icon iconType="toss" />
        </Flex>
      </button>
    </CopyToClipboard>
  );
};

export default BankSendButton;
