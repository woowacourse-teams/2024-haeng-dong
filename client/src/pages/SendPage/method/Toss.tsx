import {FixedButton, FunnelLayout, Top} from '@components/Design';

import {StepBase} from './StepBase';

type TossProps = StepBase & {
  onTossClick: () => void;
};

const Toss = ({onTossClick, changeStep}: TossProps) => {
  return (
    <FunnelLayout>
      <Top>
        <Top.Line text="토스열기 버튼을 눌러" />
        <Top.Line text="토스로 송금할 수 있어요." emphasize={['토스']} />
      </Top>
      <img src={`${process.env.IMAGE_URL}/standingDog.svg`} width={280} height={280} style={{margin: '0 auto'}} />
      <FixedButton onBackClick={() => changeStep('whole')} onClick={onTossClick}>
        토스열기
      </FixedButton>
    </FunnelLayout>
  );
};

export default Toss;
