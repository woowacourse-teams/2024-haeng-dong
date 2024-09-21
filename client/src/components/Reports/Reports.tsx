import useReportsPage from '@hooks/useReportsPage';

import {ExpenseList, Flex, Input, Text} from '@HDesign/index';

const Reports = () => {
  const {isEmpty, matchedReports, expenseListProp, name, changeName} = useReportsPage();

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {!isEmpty ? (
        <>
          <Input inputType="search" value={name} onChange={changeName} placeholder="참여자 이름" />
          {matchedReports.length !== 0 && <ExpenseList expenseList={expenseListProp} />}
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
