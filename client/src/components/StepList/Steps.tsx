import {Step as StepType} from 'types/serviceType';
import BillEmptyFallback from '@pages/fallback/BillEmptyFallback';

import {Flex} from '@HDesign/index';

import Step from './Step';

interface Props {
  data: StepType[];
  isAdmin: boolean;
}

const Steps = ({data, isAdmin}: Props) => {
  if (data.length <= 0 && !isAdmin) {
    return <BillEmptyFallback />;
  }

  return (
    <Flex flexDirection="column" gap="0.5rem">
      {data.map((step, index) => (
        <Step key={index} step={step} isAdmin={isAdmin} />
      ))}
    </Flex>
  );
};

export default Steps;
