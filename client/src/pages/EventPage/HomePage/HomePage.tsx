import {useOutletContext} from 'react-router-dom';

import MemberReportList from '@components/MemberReportList/MemberReportList';
import StepList from '@components/StepList/StepList';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Tab, Tabs, Title} from '@HDesign/index';

import {EventPageContextProps} from '../EventPageLayout';
import useRequestGetStepList from '@hooks/queries/useRequestGetStepList';

const HomePage = () => {
  const {eventName} = useOutletContext<EventPageContextProps>();
  const {data: stepList} = useRequestGetStepList();
  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  return (
    <div style={{paddingBottom: '2rem'}}>
      <Title title={eventName} amount={totalExpenseAmount} />
      <Tabs tabsContainerStyle={{gap: '1rem'}}>
        <Tab label="전체 지출 내역" content={<StepList data={stepList ?? []} />} />
        <Tab label="참여자 별 내역" content={<MemberReportList />} />
      </Tabs>
    </div>
  );
};

export default HomePage;
