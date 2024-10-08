import type {EventPageContextProps} from '../EventPageLayout';

import {useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import useRequestGetSteps from '@hooks/queries/step/useRequestGetSteps';
import Reports from '@components/Reports/Reports';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Icon, Tab, Tabs, Title} from '@HDesign/index';

import {receiptStyle} from './HomePage.style';
import useRequestGetImages from '@hooks/queries/images/useRequestGetImages';

const HomePage = () => {
  const {isAdmin, eventName} = useOutletContext<EventPageContextProps>();
  const {steps} = useRequestGetSteps();
  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  return (
    <div css={receiptStyle}>
      <Title title={eventName} amount={totalExpenseAmount} icon={<Icon iconType="photoButton" />} />
      <Tabs>
        <Tab label="참여자 별 정산" content={<Reports />} />
        <Tab label="전체 지출 내역" content={<StepList data={steps ?? []} isAdmin={isAdmin} />} />
      </Tabs>
    </div>
  );
};

export default HomePage;
