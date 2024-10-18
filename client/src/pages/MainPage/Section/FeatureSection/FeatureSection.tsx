import {SimpleShare} from './SimpleShare';
import {Calculate} from './Calculate';
import {CheckDeposit} from './CheckDeposit';
import {SimpleTransfer} from './SimpleTransfer';
import {Photo} from './Photo';

const FeatureSection = () => {
  return (
    <>
      <SimpleShare />
      <Calculate />
      <CheckDeposit />
      <SimpleTransfer />
      <Photo />
    </>
  );
};

export default FeatureSection;
