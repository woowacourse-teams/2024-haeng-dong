import {useRef} from 'react';

import {SimpleShare} from './SimpleShare';
import {AutoCalculate} from './AutoCalculate';
import {CheckDeposit} from './CheckDeposit';
import {SimpleTransfer} from './SimpleTransfer';
import {RecordMemoryWithPhoto} from './RecordMemoryWithPhoto';

const FeatureSection = () => {
  const simpleTransferRef = useRef<HTMLElement>(null);

  return (
    <>
      <SimpleShare />
      <AutoCalculate />
      <CheckDeposit />
      <SimpleTransfer targetRef={simpleTransferRef} />
      <RecordMemoryWithPhoto targetRef={simpleTransferRef} />
    </>
  );
};

export default FeatureSection;
