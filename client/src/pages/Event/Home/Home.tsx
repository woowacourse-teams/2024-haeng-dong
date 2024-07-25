import {Tab, Tabs, Title} from 'haengdong-design';

import MemberReportList from '@components/MemberReportList/MemberReportList';
import StepList from '@components/StepList/StepList';
import {useStepList} from '@hooks/useStepList/useStepList';

const HomeContent = () => {
  const {getTotalPrice} = useStepList();

  return (
    <>
      <Title title="행동대장 야유회" price={getTotalPrice()} />
      <Tabs tabsContainerStyle={{gap: '1rem'}}>
        <Tab label="전체 지출 내역" content={<StepList />} />
        <Tab label="참여자 별 내역" content={<MemberReportList />} />
      </Tabs>
    </>
  );
};

export default HomeContent;
