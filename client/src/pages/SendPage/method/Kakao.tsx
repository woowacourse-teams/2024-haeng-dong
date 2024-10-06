import {FixedButton, FunnelLayout, Top} from '@components/Design';

import {StepBase} from './StepBase';

type KakaoProps = StepBase & {
  copyText: string;
  onKakaoPayClick: () => void;
};

const Kakao = ({copyText, onKakaoPayClick, changeStep}: KakaoProps) => {
  const copyAndGoKakaoPay = async () => {
    await window.navigator.clipboard.writeText(copyText);
    onKakaoPayClick();
  };

  return (
    <FunnelLayout>
      <Top>
        <Top.Line text="카카오페이 앱에서" />
        <Top.Line text="송금버튼을 눌러주세요." emphasize={['송금버튼']} />
      </Top>
      <img src={`${process.env.IMAGE_URL}/standingDog.svg`} width={280} height={280} style={{margin: '0 auto'}} />
      <FixedButton onBackClick={() => changeStep('whole')} onClick={copyAndGoKakaoPay}>
        카카오페이
      </FixedButton>
    </FunnelLayout>
  );
};

export default Kakao;
