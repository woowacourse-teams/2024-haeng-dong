/** @jsxImportSource @emotion/react */

import Text from '@HDcomponents/Text/Text';
import {useTheme} from '@theme/HDesignProvider';

import isMobileDevice from '@utils/isMobileDevice';

import BankSendButton from '../BankSendButton/BankSendButton';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';

import {ExpenseItemProps, ExpenseListProps} from './ExpenseList.type';
import {expenseItemStyle, expenseListStyle, expenseItemLeftStyle} from './ExpenseList.style';

// TODO: (@soha) 따로 파일 분리할까 고민중.. 여기서만 사용할 것 같긴 한데.. 흠
// TODO: (@todari) : 추후 클릭 시 상호작용이 생기면 iconButton으로 변경할 수 있음
function ExpenseItem({name, price, onBankButtonClick, clipboardText, ...divProps}: ExpenseItemProps) {
  return (
    <div css={expenseItemStyle} {...divProps}>
      <Text size="bodyBold">{name}</Text>
      <div css={expenseItemLeftStyle}>
        <Text>{price.toLocaleString('ko-kr')}원</Text>
        {isMobileDevice() ? (
          <BankSendButton clipboardText={clipboardText} onBankButtonClick={onBankButtonClick} />
        ) : (
          <IconButton variants="none" size="small">
            <Icon iconType="rightChevron" />
          </IconButton>
        )}
      </div>
    </div>
  );
}

function ExpenseList({expenseList = []}: ExpenseListProps) {
  const {theme} = useTheme();
  return (
    <div css={expenseListStyle(theme)}>
      {expenseList.map((expense, index: number) => (
        <ExpenseItem key={expense.name + index} {...expense} />
      ))}
    </div>
  );
}

export default ExpenseList;
