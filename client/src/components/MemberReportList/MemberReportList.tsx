import {ExpenseList, Flex, Input} from 'haengdong-design';
import React, {useState} from 'react';

import useSearchMemberReportList from '@hooks/useSearchMemberReportList/useSearchMemberReportList';

const MemberReportList = () => {
  const [name, setName] = useState('');
  const {memberReportSearchList} = useSearchMemberReportList({name, eventId: '므와아아아'});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      <Input inputType="search" value={name} onChange={changeName} />
      <ExpenseList expenseList={memberReportSearchList} />
    </Flex>
  );
};

export default MemberReportList;
