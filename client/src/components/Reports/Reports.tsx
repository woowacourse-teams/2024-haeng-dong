import React, {useState} from 'react';

import {useSearchReports} from '@hooks/useSearchReports';

import {ExpenseList, Flex, Text} from '@HDesign/index';

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

  return (
    <Flex flexDirection="column" gap="0.5rem">
      {reports.length > 0 ? (
        <ExpenseList name={name} onSearch={changeName} placeholder="이름 검색" expenseList={expenseListProp} />
      ) : (
        <Flex width="100%" justifyContent="center">
          <Text size="body" textColor="gray" style={{paddingTop: '1rem'}}>
            지금은 참여자가 한 명도 없어요. :(
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Reports;
