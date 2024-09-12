import React, {useState} from 'react';

import useSearchMemberReportList from '@hooks/useSearchMemberReportList/useSearchMemberReportList';

import {ExpenseList, Flex, Input, Text} from '@HDesign/index';

const MemberReportList = () => {
  const [name, setName] = useState('');
  const {memberReportSearchList, memberReportList} = useSearchMemberReportList({name});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const onBankButtonClick = (price: number) => {
    // 가격을 복사하고 토스 앱으로 연결
    // window.navigator.clipboard.writeText(``);
    // const url = 'supertoss://';
    // window.location.href = url;
  };

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {memberReportList.length > 0 ? (
        <>
          <Input inputType="search" value={name} onChange={changeName} placeholder="참여자 이름" />
          {memberReportSearchList.length !== 0 && (
            <ExpenseList expenseList={memberReportSearchList.map(member => ({...member, onBankButtonClick}))} />
          )}
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
