/** @jsxImportSource @emotion/react */

import Text from '@HDcomponents/Text/Text';
import Icon from '@HDcomponents/Icon/Icon';
import {useTheme} from '@theme/HDesignProvider';

import IconButton from '../IconButton/IconButton';

import {ExpenseItemProps, ExpenseListProps} from './ExpenseList.type';
import {expenseItemStyle, expenseListStyle, expenseItemLeftStyle} from './ExpenseList.style';

// TODO: (@soha) 따로 파일 분리할까 고민중.. 여기서만 사용할 것 같긴 한데.. 흠
// TODO: (@todari) : 추후 클릭 시 상호작용이 생기면 iconButton으로 변경할 수 있음
function ExpenseItem({name, price, onBankButtonClick, ...buttonProps}: ExpenseItemProps) {
  return (
    <button css={expenseItemStyle} {...buttonProps}>
      <Text size="bodyBold">{name}</Text>
      <div css={expenseItemLeftStyle}>
        <Text>{price.toLocaleString('ko-kr')}원</Text>
        <IconButton size="small" variants="none" onClick={() => onBankButtonClick(price)}>
          <Icon iconType="toss" />
        </IconButton>
        <Icon iconType="rightChevron" />
      </div>
    </button>
  );
}

function ExpenseList({expenseList = []}: ExpenseListProps) {
  const {theme} = useTheme();
  return (
    <div css={expenseListStyle(theme)}>
      {expenseList.map(({name, price, onBankButtonClick}, index: number) => (
        <ExpenseItem key={name + index} name={name} price={price} onBankButtonClick={onBankButtonClick} />
      ))}
    </div>
  );
}

export default ExpenseList;
