import {Button, FunnelLayout, Top, TopNav} from '@components/Design';

import {StepBase} from './StepBase';

type WholeProps = StepBase & {
  accountText: string;
  amountText: string;
};

const Whole = ({accountText, amountText, changeStep}: WholeProps) => {
  return (
    <>
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Top>
          <Top.Line text={accountText} />
          <Top.Line text={amountText} emphasize={[amountText]} />
        </Top>
        <Button variants="tertiary" size="medium" onClick={() => changeStep('copy')}>
          복사하기
        </Button>
        <Button variants="tertiary" size="medium" onClick={() => changeStep('toss')}>
          토스
        </Button>
        <Button variants="tertiary" size="medium" onClick={() => changeStep('kakaopay')}>
          카카오페이
        </Button>
      </FunnelLayout>
    </>
  );
};

export default Whole;
