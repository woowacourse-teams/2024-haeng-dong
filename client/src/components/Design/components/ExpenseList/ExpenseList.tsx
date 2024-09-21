/** @jsxImportSource @emotion/react */
import Text from '@HDcomponents/Text/Text';

import isMobileDevice from '@utils/isMobileDevice';

import BankSendButton from '../BankSendButton/BankSendButton';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import Flex from '../Flex/Flex';
import Input from '../Input/Input';
import Amount from '../Amount/Amount';

import {ExpenseItemProps, ExpenseListProps} from './ExpenseList.type';

function ExpenseItem({name, price, onBankButtonClick, clipboardText, ...divProps}: ExpenseItemProps) {
  return (
    <Flex
      justifyContent="spaceBetween"
      alignItems="center"
      height="2.5rem"
      padding="0.5rem 1rem"
      paddingInline="0.5rem"
      {...divProps}
    >
      <Text size="bodyBold" color="onTertiary">
        {name}
      </Text>
      <Flex alignItems="center" gap="0.5rem">
        <Amount amount={price} />
        {isMobileDevice() ? (
          <BankSendButton clipboardText={clipboardText} onBankButtonClick={onBankButtonClick} />
        ) : (
          <IconButton variants="none" size="small">
            <Icon iconType="rightChevron" />
          </IconButton>
        )}
      </Flex>
    </Flex>
  );
}

function ExpenseList({name, onSearch, placeholder, expenseList = []}: ExpenseListProps) {
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
      <Input inputType="search" value={name} onChange={onSearch} placeholder={placeholder} />
      {expenseList.length !== 0 &&
        expenseList.map((expense, index: number) => <ExpenseItem key={expense.name + index} {...expense} />)}
    </Flex>
  );
}

export default ExpenseList;
