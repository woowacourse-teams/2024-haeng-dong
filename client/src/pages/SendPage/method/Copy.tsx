import toast from '@hooks/useToast/toast';

import {FixedButton, FunnelLayout, Top} from '@components/Design';

import {StepBase} from './StepBase';

type CopyProps = StepBase & {
  copyText: string;
};

const Copy = ({copyText, changeStep}: CopyProps) => {
  const onCopy = async () => {
    await window.navigator.clipboard.writeText(copyText);
    toast.confirm('금액이 복사되었어요.');
  };

  return (
    <FunnelLayout>
      <Top>
        <Top.Line text="복사하기 버튼을 눌러" />
        <Top.Line text="직접 송금해주세요." emphasize={['직접 송금']} />
      </Top>
      <img src={`${process.env.IMAGE_URL}/standingDog.svg`} width={280} height={280} style={{margin: '0 auto'}} />
      <FixedButton onBackClick={() => changeStep('whole')} onClick={onCopy}>
        복사하기
      </FixedButton>
    </FunnelLayout>
  );
};

export default Copy;
