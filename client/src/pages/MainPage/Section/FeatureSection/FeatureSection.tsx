import {css} from '@emotion/react';
import {forwardRef, ForwardedRef} from 'react';

import {SimpleShare} from './SimpleShare';
import {AutoCalculate} from './AutoCalculate';
import {CheckDeposit} from './CheckDeposit';
import {SimpleTransfer} from './SimpleTransfer';
import {RecordMemoryWithPhoto} from './RecordMemoryWithPhoto';

const FeatureSection = forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
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
});

export default FeatureSection;
