import React, {useState} from 'react';

import BillEmptyFallback from '@pages/EventPage/EventPageFallback/BillEmptyFallback';

import {useSearchReports} from '@hooks/useSearchReports';

import {ExpenseList, Flex} from '@HDesign/index';

const Reports = () => {
  const [name, setName] = useState('');
  const {matchedReports, reports} = useSearchReports({name});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const onBankButtonClick = () => {
    const url = 'supertoss://';
    window.location.href = url;
  };

  const expenseListProp = matchedReports.map(member => ({
    ...member,
    clipboardText: `계좌번호 받아와야 함 ${member.price}원`,
    onBankButtonClick,
  }));

  if (reports.length <= 0) {
    return <BillEmptyFallback />;
  }

  return (
    <Flex flexDirection="column" gap="0.5rem">
      <ExpenseList name={name} onSearch={changeName} placeholder="이름 검색" expenseList={expenseListProp} />
    </Flex>
  );
};

export default Reports;
