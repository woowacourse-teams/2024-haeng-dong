/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';

import {bankButtonStyle} from './BankSendButton.style';

type BankSendButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const BankSendButton = ({...buttonProps}: BankSendButtonProps) => {
  const {theme} = useTheme();
  return (
    <button css={bankButtonStyle(theme)} {...buttonProps}>
      <Icon iconType="toss" />
      <Text size="caption" textColor="black">
        송금
      </Text>
    </button>
  );
};

export default BankSendButton;
