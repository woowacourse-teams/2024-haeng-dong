/** @jsxImportSource @emotion/react */
import CopyToClipboard from 'react-copy-to-clipboard';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';

import {bankButtonStyle} from './BankSendButton.style';

type BankSendButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  clipboardText: string;
  onBankButtonClick: () => void;
};

const BankSendButton = ({clipboardText, onBankButtonClick, ...buttonProps}: BankSendButtonProps) => {
  const {theme} = useTheme();
  return (
    <CopyToClipboard text={clipboardText} onCopy={onBankButtonClick}>
      <button css={bankButtonStyle(theme)} {...buttonProps}>
        <Icon iconType="toss" />
        <Text size="caption" textColor="black">
          송금
        </Text>
      </button>
    </CopyToClipboard>
  );
};

export default BankSendButton;
