import {css} from '@emotion/react';

import {SimpleShare} from './SimpleShare';
import {AutoCalculate} from './AutoCalculate';
import {CheckDeposit} from './CheckDeposit';
import {SimpleTransfer} from './SimpleTransfer';
import {RecordMemoryWithPhoto} from './RecordMemoryWithPhoto';
import useMainPageYScroll from '@hooks/useMainPageYScroll';

const FeatureSection = () => {
  const {featureSectionRef} = useMainPageYScroll();

  return (
    <div
      ref={featureSectionRef}
      css={css({
        display: 'flex',
        transform: 'translateX(200vw)',
        overflowY: 'hidden',
        background: 'linear-gradient(to right, #FFA5B8 0%, #DFC1FF 50%, #C1CFFF 100%)',
      })}
    >
      <SimpleShare />
      <AutoCalculate />
      <CheckDeposit />
      <SimpleTransfer />
      <RecordMemoryWithPhoto />
    </div>
  );
};

export default FeatureSection;
