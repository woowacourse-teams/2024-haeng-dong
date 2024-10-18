import {SimpleShare} from './SimpleShare';
import {AutoCalculate} from './AutoCalculate';
import {CheckDeposit} from './CheckDeposit';
import {SimpleTransfer} from './SimpleTransfer';
import {RecordMemoryWithPhoto} from './RecordMemoryWithPhoto';

const FeatureSection = () => {
  return (
    <>
      <SimpleShare />
      <AutoCalculate />
      <CheckDeposit />
      <SimpleTransfer />
      <RecordMemoryWithPhoto />
    </>
  );
};

export default FeatureSection;
