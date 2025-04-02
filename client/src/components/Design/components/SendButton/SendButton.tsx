/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {sendButtonStyle} from './SendButton.style';

type BankSendButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  isDeposited: boolean;
  canSend: boolean;
};

const SendButton = ({isDeposited = false, canSend = true, ...buttonProps}: BankSendButtonProps) => {
  const {theme} = useTheme();

  return (
    <button css={sendButtonStyle(theme, isDeposited)} disabled={isDeposited} {...buttonProps}>
      <Flex justifyContent="center" alignItems="center">
        <Text size="tiny" textColor="black">
          {isDeposited ? '송금완료' : canSend ? '송금하기' : '금액복사'}
        </Text>
      </Flex>
    </button>
  );
};

export default SendButton;
