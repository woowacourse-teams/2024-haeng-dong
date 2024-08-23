import {ExpenseList, Flex, Input, Text} from 'haengdong-design';
import React, {useEffect, useState} from 'react';

import useSearchMemberReportList from '@hooks/useSearchMemberReportList/useSearchMemberReportList';

const MemberReportList = () => {
  const [name, setName] = useState('');
  const {memberReportSearchList, memberReportList} = useSearchMemberReportList({name});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {memberReportList.length > 0 ? (
        <>
          <Input inputType="search" value={name} onChange={changeName} placeholder="참여자 이름" />
          {memberReportSearchList.length !== 0 && <ExpenseList expenseList={memberReportSearchList} />}
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

export default MemberReportList;
