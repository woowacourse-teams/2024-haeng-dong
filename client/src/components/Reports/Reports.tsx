import React, {useState} from 'react';

import {useSearchReports} from '@hooks/useSearchReports';

import {ExpenseList, Flex, Input, Text} from '@HDesign/index';

const Reports = () => {
  const [name, setName] = useState('');
  const {matchedReports, reports} = useSearchReports({name});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {reports.length > 0 ? (
        <>
          <Input inputType="search" value={name} onChange={changeName} placeholder="참여자 이름" />
          {matchedReports.length !== 0 && <ExpenseList expenseList={matchedReports} />}
        </>
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
