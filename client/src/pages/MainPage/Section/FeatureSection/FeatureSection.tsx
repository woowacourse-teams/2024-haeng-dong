import {css} from '@emotion/react';
import {useRef} from 'react';

import useMainPageYScroll from '@hooks/useMainPageYScroll';

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
        position: 'static',
        display: 'flex',
        transform: 'translateX(200vw)',
        background: 'linear-gradient(to right, #FFA5B8 0%, #DFC1FF 50%, #C1CFFF 100%)',
        height: '100vh',
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
