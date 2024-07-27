/** @jsxImportSource @emotion/react */

import Text from '@components/Text/Text';

import {Arrow} from '@assets/index';

import {useTheme} from '@theme/HDesignProvider';

import {ExpenseItemProps, ExpenseListProps} from './ExpenseList.type';
import {expenseItemStyle, expenseListStyle, expenseItemLeftStyle, TextStyle} from './ExpenseList.style';

// TODO: (@soha) 따로 파일 분리할까 고민중.. 여기서만 사용할 것 같긴 한데.. 흠
function ExpenseItem({name, price}: ExpenseItemProps) {
  const {theme} = useTheme();
  return (
    <button css={expenseItemStyle}>
      <Text size="bodyBold" css={TextStyle(theme)}>
        {name}
      </Text>
      <div css={expenseItemLeftStyle}>
        <Text css={TextStyle(theme)}>{price.toLocaleString('ko-kr')} 원</Text>
        <Arrow />
      </div>
    </button>
  );
}

function ExpenseList({expenseList = []}: ExpenseListProps) {
  const {theme} = useTheme();
  return (
    <div css={expenseListStyle(theme)}>
      {expenseList.map(({name, price}, index: number) => (
        <ExpenseItem key={name + index} name={name} price={price} />
      ))}
    </div>
  );
}

export default ExpenseList;
