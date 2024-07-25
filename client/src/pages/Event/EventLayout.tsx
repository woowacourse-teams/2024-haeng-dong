import {PropsWithChildren} from 'react';

import {StepListProvider} from '@hooks/useStepList/useStepList';

import Event from './Event';

const EventLayout = () => {
  return (
    <StepListProvider>
      <Event />
    </StepListProvider>
  );
};

export default EventLayout;
