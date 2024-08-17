import {Tab, Tabs, Title} from 'haengdong-design';

import MemberReportList from '@components/MemberReportList/MemberReportList';
import StepList from '@components/StepList/StepList';

import useGetEventName from '@hooks/useRequestGetEventName';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

const HomePage = () => {
  const {data} = useGetEventName();
  const eventName = data?.eventName ?? '';
  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  return (
    <div>
      <Title title={eventName} price={totalExpenseAmount} />
      <Tabs tabsContainerStyle={{gap: '1rem'}}>
        <Tab label="전체 지출 내역" content={<StepList />} />
        <Tab label="참여자 별 내역" content={<MemberReportList />} />
      </Tabs>
    </div>
  );
};

export default HomePage;
