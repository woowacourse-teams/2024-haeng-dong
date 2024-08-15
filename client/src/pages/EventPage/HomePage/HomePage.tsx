import {Tab, Tabs, Title} from 'haengdong-design';
import {useOutletContext} from 'react-router-dom';

import MemberReportList from '@components/MemberReportList/MemberReportList';
import StepList from '@components/StepList/StepList';
import {useStepList} from '@hooks/useStepList/useStepList';

import {EventPageContextProps} from '../EventPageLayout';

const HomePage = () => {
  const {eventName} = useOutletContext<EventPageContextProps>();
  const {getTotalPrice} = useStepList();

  return (
    <div>
      <Title title={eventName} price={getTotalPrice()} />
      <Tabs tabsContainerStyle={{gap: '1rem'}}>
        <Tab label="전체 지출 내역" content={<StepList />} />
        <Tab label="참여자 별 내역" content={<MemberReportList />} />
      </Tabs>
    </div>
  );
};

export default HomePage;
