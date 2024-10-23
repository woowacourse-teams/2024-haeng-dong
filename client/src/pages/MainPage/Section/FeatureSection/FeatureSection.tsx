import {css} from '@emotion/react';

import useMainPageYScroll from '@hooks/useMainPageYScroll';

import {useRef} from 'react';

import {SimpleShare} from './SimpleShare';
import {AutoCalculate} from './AutoCalculate';
import {CheckDeposit} from './CheckDeposit';
import {SimpleTransfer} from './SimpleTransfer';
import {RecordMemoryWithPhoto} from './RecordMemoryWithPhoto';

const FeatureSection = () => {
  const {featureSectionRef} = useMainPageYScroll();
  const simpleTransferRef = useRef<HTMLElement>(null);

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
      <SimpleTransfer targetRef={simpleTransferRef} />
      <RecordMemoryWithPhoto targetRef={simpleTransferRef} />
    </div>
  );
};

export default FeatureSection;
