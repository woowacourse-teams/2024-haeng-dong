/** @jsxImportSource @emotion/react */
import Text from '@HDcomponents/Text/Text';

import {isMobileDevice} from '@utils/detectDevice';

import BankSendButton from '../BankSendButton/BankSendButton';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import Flex from '../Flex/Flex';
import Input from '../Input/Input';
import Amount from '../Amount/Amount';
import DepositCheck from '../DepositCheck/DepositCheck';

import {ExpenseItemProps, ExpenseListProps} from './ExpenseList.type';

function ExpenseItem({
  memberName,
  price,
  isDeposited,
  onBankButtonClick,
  clipboardText,
  ...divProps
}: ExpenseItemProps) {
  return (
    <Flex
      justifyContent="spaceBetween"
      alignItems="center"
      height="2.5rem"
      padding="0.5rem 1rem"
      paddingInline="0.5rem"
      {...divProps}
    >
      <Flex gap="0.5rem" alignItems="center">
        <DepositCheck isDeposited={isDeposited} />
        <Text size="bodyBold" color="onTertiary">
          {memberName}
        </Text>
      </Flex>
      <Flex alignItems="center" gap="0.5rem">
        <Amount amount={price} />
        {isMobileDevice() ? (
          <BankSendButton
            clipboardText={clipboardText}
            onBankButtonClick={onBankButtonClick}
            isDeposited={price <= 0 || isDeposited}
          />
        ) : (
          <IconButton variants="none" size="small">
            <Icon iconType="rightChevron" />
          </IconButton>
        )}
      </Flex>
    </Flex>
  );
}

function ExpenseList({memberName, onSearch, placeholder, expenseList = []}: ExpenseListProps) {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      backgroundColor="white"
      padding="0.5rem 1rem"
      paddingInline="0.5rem"
      gap="0.5rem"
      height="100%"
      otherStyle={{borderRadius: '1rem'}}
    >
      <Input inputType="search" value={memberName} onChange={onSearch} placeholder={placeholder} />
      {expenseList.length !== 0 && expenseList.map(expense => <ExpenseItem key={expense.memberId} {...expense} />)}
    </Flex>
  );
}

export default ExpenseList;
