import BillEmptyFallback from '@pages/EventPage/EventPageFallback/BillEmptyFallback';

import useReportsPage from '@hooks/useReportsPage';

import {ExpenseList, Flex} from '@HDesign/index';

const Reports = () => {
  const {isEmpty, expenseListProp, memberName, changeName} = useReportsPage();

  if (isEmpty) {
    return <BillEmptyFallback />;
  }

  return (
    <Flex flexDirection="column" gap="0.5rem">
      <ExpenseList
        memberName={memberName}
        onSearch={changeName}
        placeholder="이름 검색"
        expenseList={expenseListProp}
      />
    </Flex>
  );
};

export default Reports;
