import {useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import useRequestGetSteps from '@hooks/queries/step/useRequestGetSteps';
import Reports from '@components/Reports/Reports';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Tab, Tabs, Title} from '@HDesign/index';

import {EventPageContextProps} from '../EventPageLayout';

const HomePage = () => {
  const {eventName} = useOutletContext<EventPageContextProps>();
  const {steps} = useRequestGetSteps();
  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  return (
    <div style={{paddingBottom: '2rem'}}>
      <Title title={eventName} amount={totalExpenseAmount} />
      <Tabs tabsContainerStyle={{gap: '1rem'}}>
        <Tab label="전체 지출 내역" content={<StepList data={steps ?? []} />} />
        <Tab label="참여자 별 내역" content={<Reports />} />
      </Tabs>
    </div>
  );
};

export default HomePage;
