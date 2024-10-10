/** @jsxImportSource @emotion/react */
import Text from '@HDcomponents/Text/Text';

import Flex from '../Flex/Flex';
import Input from '../Input/Input';
import Amount from '../Amount/Amount';
import DepositCheck from '../DepositCheck/DepositCheck';
import SendButton from '../SendButton/SendButton';

import {ExpenseItemProps, ExpenseListProps} from './ExpenseList.type';

function ExpenseItem({
  memberId,
  memberName,
  price,
  isDeposited,
  canSendBank,
  onSendButtonClick,
  onCopy,
  ...divProps
}: ExpenseItemProps) {
  const onClick = () => {
    // 송금 가능하면 송금페이지, 아니라면 금액복사
    if (canSendBank) {
      onSendButtonClick(memberId, price);
    } else {
      onCopy(price);
    }
  };

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
        <SendButton onClick={onClick} isDeposited={price <= 0 || isDeposited} canSend={canSendBank} />
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
