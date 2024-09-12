/** @jsxImportSource @emotion/react */

import Text from '@HDcomponents/Text/Text';
import {useTheme} from '@theme/HDesignProvider';

import isMobileDevice from '@utils/isMobileDevice';

import BankSendButton from '../BankSendButton/BankSendButton';

import {ExpenseItemProps, ExpenseListProps} from './ExpenseList.type';
import {expenseItemStyle, expenseListStyle, expenseItemLeftStyle} from './ExpenseList.style';

// TODO: (@soha) 따로 파일 분리할까 고민중.. 여기서만 사용할 것 같긴 한데.. 흠
// TODO: (@todari) : 추후 클릭 시 상호작용이 생기면 iconButton으로 변경할 수 있음
function ExpenseItem({name, price, ...buttonProps}: ExpenseItemProps) {
  // toss로 송금하는 버튼, 모바일이 아니면 실행되지 않도록 설정
  const onBankButtonClick = () => {
    if (!isMobileDevice()) return;

    // 가격을 복사하고 토스 앱으로 연결

    const url = 'supertoss://';
    window.location.href = url;
  };

  return (
    <button css={expenseItemStyle} {...buttonProps}>
      <Text size="bodyBold">{name}</Text>
      <div css={expenseItemLeftStyle}>
        <Text>{price.toLocaleString('ko-kr')}원</Text>
        <BankSendButton clipboardText={`계좌번호 받아와야 함 ${price}원`} onBankButtonClick={onBankButtonClick} />
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
